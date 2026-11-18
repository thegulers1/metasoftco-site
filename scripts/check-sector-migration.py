"""Check all known TR/EN sector redirects and the new service page. Read-only."""
import concurrent.futures,json,re,subprocess,sys
from urllib.parse import urlsplit
base=(sys.argv[1] if len(sys.argv)>1 else 'http://localhost:3188').rstrip('/')
tr=['','saglik-sektoru','gida-sektoru','otomotiv-sektoru','perakende-sektoru','finans-sektoru','kurumsal-etkinlik','teknoloji-sektoru','tekstil-sektoru-dijital-donusum']
en=['','healthcare','food-beverage','automotive','retail-ecommerce','finance-insurance','corporate-events','technology-saas','textile-fashion']
def fetch(path):
 r=subprocess.run(['curl','-4','--http1.1','--max-time','30','-sS','-D','-',base+path],text=True,capture_output=True)
 if r.returncode: raise RuntimeError(path+': '+r.stderr)
 headers,body=r.stdout.split('\n\n',1)
 return int(re.search(r'HTTP/\S+ (\d+)',headers).group(1)),headers,body
pairs=[]
for old,new,slugs in [('sektorel-yazilim-cozumleri','sektorel-etkinlik-cozumleri',tr),('en/industry-software-solutions','en/industry-event-solutions',en)]:
 for slug in slugs:
  tail='/'+slug if slug else ''
  pairs.append(('/'+old+tail,'/'+new+tail))
pairs += [('/sektorel-yazilim-cozumleri/tekstil-sektoru','/sektorel-etkinlik-cozumleri/tekstil-sektoru-dijital-donusum'),('/sektorel-yazilim-cozumleri/finans-sektoru?utm_source=migration','/sektorel-etkinlik-cozumleri/finans-sektoru?utm_source=migration')]
def check(pair):
 old,new=pair
 status,headers,_=fetch(old)
 location=re.search(r'(?im)^location:\s*(.+)$',headers).group(1).strip()
 parsed=urlsplit(location); actual=parsed.path+('?' + parsed.query if parsed.query else '')
 assert status==301 and actual==new,(old,status,location)
 status,_,body=fetch(new)
 canonical=re.findall(r'<link[^>]*rel="canonical"[^>]*href="([^"]+)"',body)
 assert status==200,(new,status)
 assert canonical==['https://www.metasoftco.com'+new.split('?')[0]],(new,canonical)
 assert not re.search(r'href="[^\"]*(?:sektorel-yazilim-cozumleri|industry-software-solutions)',body),new
 return {'old':old,'new':new,'redirect':301,'destination':200,'canonical':canonical[0]}
with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool: results=list(pool.map(check,pairs))
path='/hizmetler/markaya-ozel-etkinlik-yazilimi'
status,_,body=fetch(path)
assert status==200 and 'Markaya Özel Etkinlik Yazılımı' in body
assert f'rel="canonical" href="https://www.metasoftco.com{path}"' in body
schemas=[json.loads(s) for s in re.findall(r'<script[^>]*type="application/ld\+json"[^>]*>(.*?)</script>',body)]
assert any(s.get('@type')=='Service' and s.get('url')=='https://www.metasoftco.com'+path for s in schemas)
_,_,sitemap=fetch('/sitemap.xml')
assert path in sitemap and 'sektorel-yazilim-cozumleri' not in sitemap and 'industry-software-solutions' not in sitemap
print(json.dumps({'base':base,'redirects':results,'newPage':'200 + self canonical + Service schema','sitemap':'new URLs only'},ensure_ascii=False,indent=2))
