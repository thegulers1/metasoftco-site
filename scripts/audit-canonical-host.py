"""Read-only HTTP/canonical audit. Saves reproducible evidence; never changes hosting."""
import concurrent.futures, datetime, html, json, re, subprocess
from pathlib import Path
from urllib.parse import urljoin
PATHS = ['/', '/hakkimizda', '/blog/yapay-zeka-yuz-degistirme-face-swap-nasil-calisir', '/hizmetler/interaktif-etkinlik-aktiviteleri/reflex-game-hiz-ve-rekabet-oyunu', '/projeler/defacto-x-afra-saracoglu-ai-fashion-experience', '/en/blog/how-ai-face-swap-technology-works']
ORIGINS = ['http://metasoftco.com','http://www.metasoftco.com','https://metasoftco.com','https://www.metasoftco.com']
def fetch(url):
 r=subprocess.run(['curl','-4','--http1.1','--max-time','25','-sS','-D','-','-o','-','-A','MetasoftCoCanonicalAudit/1.0',url],capture_output=True,text=True)
 if r.returncode: return {'url':url,'error':r.stderr.strip()}
 parts=re.split(r'\r?\n\r?\n',r.stdout,maxsplit=1); headers=parts[0]; body=parts[1] if len(parts)>1 else ''
 return {'url':url,'status':int(re.search(r'HTTP/\S+ (\d+)',headers).group(1)),'location':next(iter(re.findall(r'(?im)^location:\s*(.*?)\r?$',headers)),None),'canonical':[html.unescape(x) for x in re.findall(r'<link[^>]*rel="canonical"[^>]*href="([^"]+)"',body)],'robots':re.findall(r'<meta[^>]*name="robots"[^>]*content="([^"]+)"',body),'xRobots':re.findall(r'(?im)^x-robots-tag:\s*(.*?)\r?$',headers),'title':re.findall(r'<title>(.*?)</title>',body),'apexLinks':sorted(set(re.findall(r'(?:href|src)="(https?://metasoftco\.com[^" ]*)"',body))),'body':body}
urls=[o+p for p in PATHS for o in ORIGINS]+['https://metasoftco.com/hakkimizda?utm_source=canonical-audit','https://event.metasoftco.com/','https://www.metasoftco.com/sitemap.xml','https://www.metasoftco.com/robots.txt']
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool: rows=list(pool.map(fetch,urls))
for r in rows:
 body=r.pop('body','')
 if r['url'].endswith('sitemap.xml'):
  locs=re.findall(r'<loc>(.*?)</loc>',body); r['urlCount']=len(locs); r['nonCanonicalHosts']=[u for u in locs if not u.startswith('https://www.metasoftco.com/')]
 if r['url'].endswith('robots.txt'): r['text']=body
result={'checkedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'results':rows}
Path('docs/seo-2026-11/canonical-audit.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
for r in rows: print(json.dumps({k:v for k,v in r.items() if k not in ['text','title','apexLinks']},ensure_ascii=False))
