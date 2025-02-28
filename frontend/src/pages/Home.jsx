import Calendar from '../components/Calendar';

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center 
            w-full sm:w-full lg:w-[70vw] 
            h-[90vh] 
            pt-2 pb-2 sm:pt-3 sm:pb-3 lg:pt-5 lg:pb-5 
            mt-5 sm:mt-8 lg:mt-10">
            <Calendar />
        </div>
    );
}

export default Home;
