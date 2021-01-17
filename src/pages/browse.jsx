import { BrowseContainer } from '../containers/browse';
import {useContent} from '../hooks';
import SelectionFilter from '../utilities/selection-filter';

export default function Browse(){
    // fetching series and films
    const {series} = useContent("series");
    const {films} = useContent("films");
    const slides = SelectionFilter({series, films});

    return <BrowseContainer slides={slides} />
}