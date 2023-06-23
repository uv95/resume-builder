
import parse from 'html-react-parser';
import {  IProfileItem } from '@/utils/types/contentTypes';

type Props = {
  items:IProfileItem[]
}

const ProfileBlock = ({items}:Props) => {
    return (
        <>
            {
                items.map((item) => <div key={item.id}>{parse(item.text)}</div>)}
        </>
    );
};

export default ProfileBlock;
