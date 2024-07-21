import React, { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "../context/firebase";
import { getDocs, collection, doc, getDoc } from "firebase/firestore";
import CardForRoom from "../components/CardForRooms";

function PrevRooms() {
    const { firestore, user } = useContext(FirebaseContext);
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const fetchRooms = async () => {
            if (!user?.email) return;

            try {
                const userCollection = collection(firestore, user.email);
                const userDocs = await getDocs(userCollection);

                const roomsPromises = userDocs.docs.map(async (userDoc) => {
                    const roomDocRef = doc(firestore, "Rooms", userDoc.data().currentRooms);
                    const roomDoc = await getDoc(roomDocRef);

                    if (roomDoc.exists()) {
                        return { id: roomDoc.id, ...roomDoc.data() };
                    } else {
                        console.log("No such document!");
                        return null;
                    }
                });

                const roomsData = await Promise.all(roomsPromises);
                setRooms(roomsData.filter(room => room !== null)); 

            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchRooms();
    }, [user, firestore]);
console.log("room in prev" , rooms);
    return (
        <>
            <div style={{display:"flex" , justifyContent:"space-around", flexWrap:"wrap"}}>
            {rooms.map((room, index) => (
                <div key={index}>
                    <CardForRoom title={room.roomName} image="/group-4.jpg" info={room.info || []} id={room.id} />
                </div>
               
            ))}
             {rooms?.length === 0 ? <h1 align="center">No Room Found</h1> : null}
            </div>
        </>
    );
}

export default PrevRooms;
