// import React from "react";
// import { Header } from "./_components/Header";

// function DashboardLayout({ children }) {
//   return (
//     <div>
//       <Header />
//       <div className="mx-5 md:mx-20 lg:,mx:36">{children}</div>
//     </div>
//   );
// }

// export default DashboardLayout;

import React from "react";
import { Header } from "./_components/Header";

function DashboardLayout({ children }) {
  return (
    <div>
      <Header />
      <div className="mx-5 md:mx-20 lg:mx-36">{children}</div>

      {/* Start of Tawk.to Script */}
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
            var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
            (function() {
              var s1 = document.createElement("script"),
                  s0 = document.getElementsByTagName("script")[0];
              s1.async = true;
              s1.src = "https://embed.tawk.to/67472a0a2480f5b4f5a4b1d8/1idmvof6g";
              s1.charset = "UTF-8";
              s1.setAttribute("crossorigin", "*");
              s0.parentNode.insertBefore(s1, s0);
            })();
          `,
        }}
      ></script>
      {/* End of Tawk.to Script */}
    </div>
  );
}

export default DashboardLayout;
