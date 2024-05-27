
export const getRepoName = (githubRepoLink:string | null | undefined) => {
    if (!githubRepoLink){
        return
    }
    const repoName = githubRepoLink!.split("/").slice(-1)[0] || "";
    return repoName;
  };