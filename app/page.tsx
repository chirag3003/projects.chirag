import HomePage from "@/components/homePage";
import api from "@/lib/api";
import React from "react";

async function Page() {
  const projects = await api.projects.getProjects();
  return <HomePage projects={projects} />;
}

export default Page;
