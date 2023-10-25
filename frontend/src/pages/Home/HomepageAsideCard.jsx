import React from "react";

const HomepageAsideCard = ({ title, children }) => {
  return (
    <article className="w-full border-[1px] border-zinc-200 bg-white px-6 py-5 ">
      {title && (
        <h2 className="-translate-x-2 pb-3 text-lg font-medium">{title}</h2>
      )}

      {children}
    </article>
  );
};

export default HomepageAsideCard;
