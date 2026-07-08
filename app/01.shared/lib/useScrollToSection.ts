import { useLenis } from "./useLenis";

export function useScrollToSection(sectionId: string){
    if(sectionId == '') return
    const target = document.getElementById(sectionId)
    console.log(target)
    if(!target) return
    const lenis = useLenis();
    const top = target.offsetTop + 1
    lenis.scrollTo(top)
}