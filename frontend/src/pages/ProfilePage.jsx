import Nav from "../components/nav/nav";
import ProfileCard from "../components/ProfileStuff/ProfileCard";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProfilePage = () => {
  const [refresh, setRefresh] = useState(true);
  const params = useParams();
  const [userProfile, setUserProfile] = useState([]);

  useEffect(() => {
    const getUserProfile = async () => {
      const response = await axios.get(`/api/user/${params.id}`);
      setUserProfile(response.data);
    };
    getUserProfile();
  }, [refresh]);

  const deleteUser = async (userId) => {
    try {
      const { data } = await axios.delete(`/api/user/delete/${userId}`);
      setRefresh((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <header>
        <div>
          <Nav />
        </div>
      </header>

      <main>
        <section>
          <ProfileCard
            key={userProfile._id}
            id={userProfile._id}
            email={userProfile.email}
            name={userProfile.name}
            description={userProfile.description}
            imageUrl={userProfile.image?.url}
            onDelete={() => deleteUser(userProfile._id)}
          />
        </section>
        {/*             <section onClick={() => {setAddingItem(false)}}>
                <AddFormular addingItem={addingItem} setRefresh={setRefresh}
                setAddingItem={setAddingItem} category={params.category} />
            </section> */}
      </main>
    </>
  );
};

export default ProfilePage;
