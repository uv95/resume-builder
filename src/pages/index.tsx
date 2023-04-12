import MainPanel from '@/components/MainPanel/MainPanel';
import Navigation from '@/components/Navigation/Navigation';
import Resume from '@/components/Resume/Resume';
import style from '../styles/Home.module.scss';

export default function Home() {
  return (
    <main>
      <div className={style.home}>
        <div className="flex">
          <Navigation />
          <MainPanel />
        </div>
        <Resume />
      </div>
    </main>
  );
}
