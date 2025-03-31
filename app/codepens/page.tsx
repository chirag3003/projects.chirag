import CodePensPage from "@/components/codePensPage";
import api from "@/lib/api";
import React from "react";

async function Page() {
  const projects = await api.projects.getProjects();
  return <CodePensPage projects={projects} />;
}

export default Page;
