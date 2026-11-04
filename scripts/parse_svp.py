# Prevedie text oficiálnych PDF na záznamy štandardov. Text sa nikdy neprepisuje, iba spája riadky.
import json,re,subprocess,sys,os,glob
root,out=sys.argv[1],sys.argv[2]
man=json.load(open(root+'/svp/manifest.json',encoding='utf8'))['documents']
def doc(key):
    return next(d for d in man if key in d['file'])
def pages(d):
    t=subprocess.run(['pdftotext','-layout','-enc','UTF-8',root+'/svp/pdf/'+d['file'],'-'],capture_output=True,text=True).stdout
    return t.split('\f')
HDR=re.compile(r'^\s*(Štátny vzdelávací program pre základné vzdelávanie|Príloha / Vzdelávacie štandardy|Príloha|\d{1,3}|©.*|.*– (nižšie stredné|primárne) vzdel.*|.*Štátny pedagogický ústav.*)\s*$')
BUL=re.compile(r'^\s*[–\-•▪•-]\s*')
def join(a,b):
    a=a.rstrip();b=b.strip()
    return a[:-1]+b if re.search(r'[a-záäčďéíĺľňóôŕšťúýž]-$',a) and not re.match(r'(a|i|alebo|aj)\b',b) else a+' '+b
def rec(prog,area,subj,stage,kind,path,text,d,page,tags=None):
    t=re.sub(r'\s+',' ',text).strip().rstrip(';,')
    return dict(program=prog,area=area,subject=subj,stage=stage,kind=kind,path=[p for p in path if p],text=t,tags=tags or [],source=dict(file=d['file'],url=d['url'],label=d['label'],page=page))
def parse23(key,area,subj,tops=(),tagre=None):
    d=doc(key);R=[];cyc=None;kind=None;goal=None;top=None;sub=None;cur=None;first=False;leftover=0
    lines=[]
    for pn,p in enumerate(pages(d),1):
        for l in p.split('\n'):
            if not HDR.match(l): lines.append((pn,l.rstrip()))
    def flush():
        nonlocal cur
        if cur and len(cur[0])>2:
            t=re.sub(r'\s+',' ',cur[0]).strip();tags=[]
            if tagre:
                m=re.search(tagre,t)
                if m: tags=[x.strip() for x in m.group(1).split(',')];t=t[:m.start()].rstrip()+t[m.end()-len(m.group(0))+len(m.group(0)):]
            R.append(rec('2023',area,subj,cyc,kind,[goal] if kind=='vykonovy' else [top,sub],t,d,cur[1],tags))
        cur=None
    n=len(lines);i=0
    while i<n:
        pn,l=lines[i];s=l.strip();i+=1
        m=re.match(r'^pre (\d)\. cyklus$',s) or re.search(r'pre (\d)\. cyklus$',s) if len(s)<90 else None
        if m and not BUL.match(l): flush();cyc=int(m.group(1));kind=None;goal=None;top=sub=None;continue
        if s=='Výkonový štandard': flush();kind='vykonovy';continue
        if s=='Obsahový štandard': flush();kind='obsahovy';first=True;sub=None;continue
        if not s: 
            continue
        if not cyc or not kind: continue
        if kind=='vykonovy':
            m=re.match(r'^(?:(\d+)\. cieľ|Cieľ č\. (\d+)):\s*(.*)',s)
            if m:
                flush();g=m.group(3)
                while i<n and lines[i][1].strip() and not re.match(r'Žiak',lines[i][1].strip()): g=join(g,lines[i][1]);i+=1
                goal=g;continue
            if re.match(r'^Žiak( vie| dokáže|.*:$)',s): flush();continue
            if BUL.match(l) or cur is None or re.search(r'[.;:]$',cur[0].strip()):
                flush();cur=[BUL.sub('',l).strip(),pn]
            else: cur[0]=join(cur[0],s)
            continue
        if BUL.match(l):
            flush();cur=[BUL.sub('',l).strip(),pn];first=False;continue
        nxt=next((x[1] for x in lines[i:i+6] if x[1].strip()),'')
        ishead=len(s)<95 and not re.search(r'[.;,:]$',s) and (cur is None or re.search(r'[.;]$',cur[0].strip()))and(BUL.match(nxt) or (len(nxt.strip())<95 and not re.search(r'[.;,]$',nxt.strip())))
        if ishead:
            flush()
            if s in tops or first: top=s;sub=None;first=False
            else: sub=s
            continue
        if cur: cur[0]=join(cur[0],s)
    flush();return R

import html
def bbox(d):
    x=subprocess.run(['pdftotext','-bbox','-enc','UTF-8',root+'/svp/pdf/'+d['file'],'-'],capture_output=True,text=True).stdout
    P=[]
    for pg in re.findall(r'<page [^>]*>(.*?)</page>',x,re.S):
        W=[(float(b),float(a),float(c),html.unescape(w)) for a,b,c,e,w in re.findall(r'<word xMin="([\d.]+)" yMin="([\d.]+)" xMax="([\d.]+)" yMax="([\d.]+)">(.*?)</word>',pg)]
        W.sort();ls=[];cur=[];y0=None
        for y,a,c,w in W:
            if y0 is None or abs(y-y0)<=3.2:
                cur.append((a,c,w));y0=y if y0 is None else y0
            else:
                ls.append(sorted(cur));cur=[(a,c,w)];y0=y
        if cur: ls.append(sorted(cur))
        P.append(ls)
    return P
def bx_col(ls):
    import collections
    c=collections.Counter()
    for r in ls:
        for p,q in zip(r,r[1:]):
            if q[0]-p[1]>9 and 200<q[0]<430: c[round(q[0])]+=1
    if not c: return None
    best=max(c,key=lambda k:sum(c.get(k+i,0) for i in (-1,0,1)))
    return best-2 if sum(c.get(best+i,0) for i in (-1,0,1))>=2 else None
def txt(ws): return ' '.join(w[2] for w in ws)
def parse15(key,area,subj):
    d=doc(key);R=[];head=None;grade=None;col=None;L=None;cell=[];cp=None
    def endL():
        nonlocal L
        if L and len(L[0])>2: R.append(rec('2015',area,subj,grade,'vykonovy',[head],L[0],d,L[1]))
        L=None
    def endcell():
        nonlocal cell
        if cell: R.append(rec('2015',area,subj,grade,'obsahovy',[head],' · '.join(cell),d,cp))
        cell=[]
    for pn,ls in enumerate(bbox(d),1):
        c=bx_col([r for r in ls if 'štandard' not in txt(r)])
        if c and col: col=c
        for idx,r in enumerate(ls):
            t=txt(r)
            if HDR.match(t): continue
            if re.search(r'Výkonový štandard',t) and 'Obsahový' in t:
                endL();endcell();col=c or next(w[0] for w in r if w[2].startswith('Obsahov'))-40
                prev=[txt(q) for q in ls[max(0,idx-4):idx] if not HDR.match(txt(q))]
                if prev and len(prev[-1])<110 and not re.search(r'[.,:;]$',prev[-1]): head=prev[-1]
                continue
            if col is None: continue
            nx=next((txt(q) for q in ls[idx+1:idx+3]),'')
            if 'Výkonový štandard' in nx and 'Obsahový' in nx: endL();endcell();continue
            g=re.search(r'na konci (\d)\. ročníka',t)
            le=[w for w in r if w[0]<col];ri=[w for w in r if w[0]>=col]
            if g: endL();endcell();grade=int(g.group(1));le=[]
            lt=txt(le)
            if lt:
                if BUL.match(lt): endL();L=[BUL.sub('',lt),pn]
                elif L: L[0]=join(L[0],lt)
            rt=txt(ri)
            if rt:
                if not cell: cp=pn
                cell.append(BUL.sub('',rt).strip())
    endL();endcell();return R
J=[]
CAP=('Látky','Interakcie','Energia','Zem','Vesmír','Organizmus','Ekosystém','Dedičnosť a premenlivosť','Evolúcia','Sily','Živé sústavy')
CAS=('Geografický komponent','Dejepisný komponent','Občiansky komponent','Eticko-osobnostný komponent')
for k,a,su,t,tg in [('36904','Človek a príroda','Človek a príroda',CAP,r'\s((?:CH|B|F)(?:,\s*(?:CH|B|F))*)[.;]?$'),('36903','Človek a spoločnosť','Človek a spoločnosť',CAS,None),('36905','Matematika a informatika','Matematika a informatika',(),None),('36901','Človek a svet práce','Človek a svet práce',(),None),('36883','Zdravie a pohyb','Telesná a športová výchova',(),None),('36884','Umenie a kultúra','Umenie a kultúra',(),None),('36305','Jazyk a komunikácia','Slovenský jazyk a literatúra',(),None),('36296','Jazyk a komunikácia','Cudzie jazyky',(),None)]:
    r=parse23(k,a,su,t,tg);print(su,len(r));J+=r
O=[('22037','Matematika a práca s informáciami','Matematika'),('22090','Matematika a práca s informáciami','Matematika'),('22036','Matematika a práca s informáciami','Informatika'),('22091','Matematika a práca s informáciami','Informatika'),
('22039','Človek a príroda','Prvouka'),('22040','Človek a príroda','Prírodoveda'),('22085','Človek a príroda','Biológia'),('22084','Človek a príroda','Fyzika'),('22083','Človek a príroda','Chémia'),
('22038','Človek a spoločnosť','Vlastiveda'),('22088','Človek a spoločnosť','Dejepis'),('22087','Človek a spoločnosť','Geografia'),('30355','Človek a spoločnosť','Občianska náuka'),
('22047','Človek a svet práce','Pracovné vyučovanie'),('22089','Človek a svet práce','Technika'),('22049','Umenie a kultúra','Hudobná výchova'),('22093','Umenie a kultúra','Hudobná výchova'),('22048','Umenie a kultúra','Výtvarná výchova'),('22092','Umenie a kultúra','Výtvarná výchova'),
('22050','Zdravie a pohyb','Telesná a športová výchova'),('22094','Zdravie a pohyb','Telesná a športová výchova'),('22046','Človek a hodnoty','Etická výchova'),('22059','Človek a hodnoty','Etická výchova'),('22108','Jazyk a komunikácia','Slovenský jazyk a literatúra'),('22082','Jazyk a komunikácia','Slovenský jazyk a literatúra'),('22078','Jazyk a komunikácia','Anglický jazyk A1'),('22072','Jazyk a komunikácia','Anglický jazyk A2')]
for k,a,su in O:
    r=parse15(k,a,su);v=sum(x['kind']=='vykonovy' for x in r);print(k,su,len(r),'vyk',v,sorted({x['stage'] for x in r},key=str));J+=r
json.dump(J,open(out,'w',encoding='utf8'),ensure_ascii=False,indent=0)
print(len(J))
