import CodePensPage from "@/components/codePensPage";
import api from "@/lib/api";
import _ from "lodash";
import React from "react";

async function Page() {
  const projects = await api.projects.getProjects();
  return <CodePensPage projects={_.shuffle(projects)} />;
}

export default Page;
