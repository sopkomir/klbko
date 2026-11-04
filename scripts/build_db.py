# Overí, že každé slovo záznamu je na uvedenej strane zdroja, a zapíše databázu pre aplikáciu.
import json,re,subprocess,sys,collections
root,src,out=sys.argv[1:4]
J=json.load(open(src,encoding='utf8'))
wd=lambda s:re.findall(r'\w+',s.lower().replace('-',''))
cache={}
def pg(f):
    if f not in cache:
        t=subprocess.run(['pdftotext','-enc','UTF-8',root+'/svp/pdf/'+f,'-'],capture_output=True,text=True).stdout.replace('-\n','').split('\f')
        cache[f]=[set(wd(p)) for p in t]
    return cache[f]
bad=[];seen=set();K=[];srcs={}
for x in J:
    f=x['source']['file'];P=pg(f);p=x['source']['page']
    bag=set().union(*P[max(0,p-1):p+1]) if p<=len(P) else set()
    W=wd(x['text'])
    miss=[w for w in W if w not in bag]
    if len(miss)>max(1,len(W)*.08) or len(W)<2 and x['kind']=='vykonovy': bad.append((f[9:20],x['text'][:70],miss[:4]));continue
    k=(x['program'],x['subject'],x['stage'],x['kind'],x['text'])
    if k in seen: continue
    seen.add(k);i=srcs.setdefault(f,len(srcs))
    K.append([x['program'],x['subject'],x['stage'],x['kind'],x['path'],x['text'],x['tags'],i,p])
meta=[None]*len(srcs)
lab={x['source']['file']:x['source'] for x in J}
for f,i in srcs.items(): meta[i]=dict(url=lab[f]['url'],label=re.sub(r'\s*\(\.pdf.*$','',re.sub(r'&nbsp;',' ',lab[f]['label'])))
json.dump(dict(sources=meta,rows=K),open(out,'w',encoding='utf8'),ensure_ascii=False,separators=(',',':'))
print('ok',len(K),'bad',len(bad));print(bad[:14])
c=collections.Counter((r[0],r[1]) for r in K)
for k,v in sorted(c.items()): print(k,v)
