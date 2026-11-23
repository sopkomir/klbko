# Rozdelí stiahnuté metodiky na krátke úryvky so zdrojom a stranou pre Sprievodcu hodinou.
import json,re,sys,os,collections
root,out=sys.argv[1],sys.argv[2]
m=json.load(open(root+'/manifest.json',encoding='utf8'))
title={p['url']:p['title'] for p in m['pages']}
SKIP=re.compile(r'^(•\s*)*$|Učíme - metodický portál|Preskočiť na obsah|^\s*\d+\s*$')
def clean(t):
    L=[l.strip() for l in t.split('\n')]
    return '\n'.join(l for l in L if l and not SKIP.search(l))
def chunks(text,size=650):
    paras=[p.strip() for p in re.split(r'\n{2,}|(?<=[.!?])\n',text) if len(p.strip())>40]
    buf=''
    for p in paras:
        p=re.sub(r'\s+',' ',p)
        if len(buf)+len(p)>size and buf: yield buf;buf=''
        buf=(buf+' '+p).strip() if len(p)<size*1.5 else p[:int(size*1.5)]
    if len(buf)>80: yield buf
sources=[];rows=[];seen=set();CAP=40
def add(src,parts):
    n=0;i=None
    for page,txt in parts:
        for c in chunks(txt):
            k=c[:120]
            if k in seen: continue
            seen.add(k)
            if i is None: i=len(sources);sources.append(src)
            rows.append([i,page,c]);n+=1
            if n>=CAP: return
for p in m['pages']:
    if any(x in p['url'] for x in ['/slovnik','/webinare','/eduhuby','/ponuka-vzdelavania']): continue
    t=clean(open(root+'/text/'+p['file'],encoding='utf8').read())
    add({'title':p['title'][:140],'url':p['url'],'tags':p.get('tags',[])},[(0,t)])
for f in m['pdfs']:
    if not f['text'] or re.match(r'^\w{8}-\d{5}\.\w{6}\.pdf$',f['file']): continue
    raw=open(root+'/text/'+f['file']+'.txt',encoding='utf8',errors='replace').read().replace('-\n','')
    pages=[(i+1,clean(x)) for i,x in enumerate(raw.split('\f'))]
    name=re.sub(r'^\w{8}-','',f['file']).rsplit('.',1)[0].replace('_',' ')
    add({'title':(title.get(f['from'],'')+': '+name)[:160].strip(': '),'url':f['url'],'tags':[]},pages)
json.dump({'sources':sources,'rows':rows},open(out,'w',encoding='utf8'),ensure_ascii=False,separators=(',',':'))
print('zdroje',len(sources),'úryvky',len(rows),'MB',round(os.path.getsize(out)/1e6,1))
