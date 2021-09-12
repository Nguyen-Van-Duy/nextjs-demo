import MeetupList from '../components/meetups/MeetupList';
import {Fragment} from 'react';
import {MongoClient} from 'mongodb';
import Head from 'next/head';

// const DUY_MEETUPS = [
//     {
//         id: 'm1',
//         title: 'A First Meetup',
//         image: 'https://cdn.nguyenkimmall.com/images/detailed/555/may-anh-cho-nguoi-moi.jpg',
//         address: 'Some address 5, 12345 Some City',
//         description: 'This is the first meetup!'
//     },
//     {
//         id: 'm2',
//         title: 'A Second Meetup',
//         image: 'https://cdn.nguyenkimmall.com/images/detailed/555/may-anh-cho-nguoi-moi.jpg',
//         address: 'Some address 10, 12345 Some City',
//         description: 'This is the Second meetup!'
//     },
//     {
//         id: 'm2',
//         title: 'A Second Meetup',
//         image: 'https://cdn.nguyenkimmall.com/images/detailed/555/may-anh-cho-nguoi-moi.jpg',
//         address: 'Some address 10, 12345 Some City',
//         description: 'This is the Second meetup!'
//     }
// ]


function HomePage(props) {

    return <Fragment>
        <Head>
            <title>Home Page</title>
            <meta name='description'
             content='Đây là phần mô tả hiện thị trên công cụ tìm kiếm' />
        </Head>
        <MeetupList meetups={props.meetups} />
    </Fragment>;
}

// export async function getServerSideProps(context) {
//     const req = context.req;
//     const res = context.res;
//     return {
//         props: {
//             meetups: DUY_MEETUPS
//         }
//     }
// }

export async function getStaticProps() {
    const client = await MongoClient.connect('mongodb+srv://duy1506:8aekmWYNOO099aTd@cluster0.evptf.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();
    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find().toArray();

    const meetupss = meetups.sort(() =>-1);

    client.close();

    return {
        props: {
            meetups: meetupss.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                description: meetup.description,
                image: meetup.image,
                id: meetup._id.toString(),
            }))
        },
        revalidate: 1
    }
}

export default HomePage;