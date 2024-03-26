import Searchbox from "@/components/Searchbox";
import React from "react";

const SearchLayout = ({ children }) => {
  return (
    <>
      <Searchbox />
      {children}
    </>
  );
};

export default SearchLayout;
