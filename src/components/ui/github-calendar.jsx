
"use client";

import Script from "next/script";

export default function GitHubCalendar() {
  const username = "sooah1219";

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold mb-4">My GitHub Activity</h2>

      <Script
        src="https://unpkg.com/github-calendar@latest/dist/github-calendar.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (window.GitHubCalendar) {
            window.GitHubCalendar(".calendar", username, {
              responsive: true,
            });
          }
        }}
      />

      <link
        rel="stylesheet"
        href="https://unpkg.com/github-calendar@latest/dist/github-calendar-responsive.css"
      />

      <div className="calendar">Loading...</div>
    </div>
  );
}
