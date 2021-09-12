import {Fragment} from 'react';
import Head from 'next/head';
import {MongoClient, ObjectId} from 'mongodb';
import MeetupDetail from '../../components/meetups/MeetupDetail';

const MeetupDetails = (props) => {
    return (
        <Fragment>
            <Head>
                <title>{props.meetupData.title}</title>
                <meta name="description" content={props.meetupData.description}/>
            </Head>
            <MeetupDetail
            image={props.meetupData.image}
            title={props.meetupData.title}
            description={props.meetupData.description}
            address={props.meetupData.address}
            />
        </Fragment>
    )
}

export async function getStaticPaths() {
    const client = await MongoClient.connect('mongodb+srv://duy1506:8aekmWYNOO099aTd@cluster0.evptf.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = meetupsCollection.find({}, {_id: 1}).toArray();


    return {
        fallback: false,
        paths: (await meetups).map((meetup) => ({
            params: { meetupId: meetup._id.toString()},
        })),
    }
}

export async function getStaticProps(context) {

    const meetupId = context.params.meetupId;

    const client = await MongoClient.connect('mongodb+srv://duy1506:8aekmWYNOO099aTd@cluster0.evptf.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();
    const meetupCollection = db.collection('meetups');

    const selectedMeetup = await meetupCollection.findOne({
        _id: ObjectId(meetupId)
    })

    console.log(selectedMeetup);

    client.close();

    return {
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                description: selectedMeetup.description,
                address: selectedMeetup.address,
                image: selectedMeetup.image,
            }
        }
    }
}

export default MeetupDetails;