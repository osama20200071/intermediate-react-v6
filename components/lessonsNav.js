import { useRouter } from "next/router";
import Link from "next/link";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

export default function LessonsNav({ allLessons }) {
  const router = useRouter();
  const currentPath = router.asPath;
  const [portalContainer, setPortalContainer] = useState(null);

  useEffect(() => {
    const container = document.getElementById("lessons-nav-portal");
    setPortalContainer(container);
  }, []);

  if (!allLessons || allLessons.length === 0 || !portalContainer) {
    return null;
  }

  const navigationContent = (
    <nav className="lessons-nav">
      <h3 className="lessons-nav-title">Course Navigation</h3>
      <div className="lessons-nav-content">
        {allLessons.map((section) => (
          <div key={section.slug} className="lessons-nav-section">
            <h4 className="lessons-nav-section-title">
              <i className={`fas fa-${section.icon}`} />
              <span>{section.title}</span>
            </h4>
            <ul className="lessons-nav-list">
              {section.lessons.map((lesson) => {
                const isActive = currentPath === lesson.fullSlug;
                return (
                  <li key={lesson.slug} className="lessons-nav-item">
                    <Link
                      href={lesson.fullSlug}
                      className={`lessons-nav-link ${isActive ? "active" : ""}`}
                    >
                      <span className="lesson-order">{lesson.order}</span>
                      {lesson.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );

  return createPortal(navigationContent, portalContainer);
}
