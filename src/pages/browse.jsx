import {useContent} from '../hooks';

export default function Browse(){
    // fetching series and films
    const {series} = useContent("series");
    const {films} = useContent("films");
    console.log("Series are ", series); 
    console.log("Films are ", films); 

    return (
        <p>Hello this is the Browse page!</p>
    );
}