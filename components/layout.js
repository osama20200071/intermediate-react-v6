import { useState } from "react";
import { useRouter } from "next/router";

import Footer from "./footer";
import Header from "./header";
import getCourseConfig from "../data/course";
import { Provider as HeaderProvider } from "../context/headerContext";
import { Provider as CourseInfoProvider } from "../context/courseInfoContext";

function Layout({ children }) {
  const courseInfo = getCourseConfig();
  const headerHook = useState({});
  const router = useRouter();

  // Check if we're on a lesson page
  const isLessonPage = router.pathname.startsWith("/lessons/");

  return (
    <CourseInfoProvider value={courseInfo}>
      <HeaderProvider value={headerHook}>
        <div className={`remix-app ${isLessonPage ? "lesson-page" : ""}`}>
          <Header title={courseInfo.title} />
          <div className="content-container">
            <div className="main">
              <>
                <div
                  id="lessons-nav-portal"
                  className="lessons-nav-sidebar"
                ></div>
                {children}
              </>
            </div>
          </div>
          <script async defer src="https://a.holt.courses/latest.js"></script>
          <noscript>
            <img
              src="https://a.holt.courses/noscript.gif"
              alt=""
              referrerPolicy="no-referrer-when-downgrade"
            />
          </noscript>
          <Footer
            twitter={courseInfo.social.twitter}
            github={courseInfo.social.github}
            linkedin={courseInfo.social.linkedin}
            bluesky={courseInfo.social.bluesky}
          />
        </div>
      </HeaderProvider>
    </CourseInfoProvider>
  );
}

export default function App({ children }) {
  return <Layout>{children}</Layout>;
}
