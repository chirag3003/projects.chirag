import HomePage from "@/components/homePage";
import api from "@/lib/api";
import React from "react";
import _ from "lodash";

async function Page() {
  const projects = await api.projects.getProjects();
  return <HomePage projects={_.shuffle(projects)} />;
}

export default Page;
