import Image from 'next/image'
import Link from 'next/link';
import github from '../../../icons/github.svg'
import style from './Footer.module.scss';

type Props = {}

const Footer = (props: Props) => {
    return (
        <div className={style.footer}>
            <div className={style.content}>
                <Link href='https://github.com/uv95'>
                    <div className="flex gap-1 aligned">
                        <Image
                            src={github}
                            alt="github"
                            width='20'
                            height='20'
                        />
                        <p>Github</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Footer