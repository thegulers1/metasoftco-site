/**
 * defer: etiketleri sayfa yüklendikten sonra (ya da ilk etkileşimde) başlatır;
 * reklam sayfasında LCP ile yarışan ~550 KB üçüncü taraf betiği ilk boyamadan sonraya kalır.
 */
export default function GoogleTagManager({ defer = false }: { defer?: boolean }) {
    const boot = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-W4ML39X7');`;
    const deferred = `(function(){var done=false;function run(){if(done)return;done=true;${boot}}
['pointerdown','keydown','scroll','touchstart'].forEach(function(e){addEventListener(e,run,{once:true,passive:true})});
function later(){setTimeout(run,1500)}
if(document.readyState==='complete')later();else addEventListener('load',later);})();`;
    return (
        <>
            <script
              dangerouslySetInnerHTML={{
                __html: defer ? deferred : boot,
              }}
            />
            <noscript>
              <iframe
                src="https://www.googletagmanager.com/ns.html?id=GTM-W4ML39X7"
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
              />
            </noscript>
        </>
    );
}
