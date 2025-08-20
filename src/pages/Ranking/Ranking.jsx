import "./Ranking.css";
import back from "../../assets/images/back.svg";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore"; // Firestore functions
import { database } from "../../firebase/config"; // Firebase config
import { format } from "date-fns"; // Import date-fns for formatting

export const Ranking = () => {
  const [users, setUsers] = useState([]); // State to store users
  const [loading, setLoading] = useState(true); // State to manage loading status

  // Fetch users data from Firestore
  const fetchRankingData = async () => {
    try {
      const usersCollection = collection(database, "users"); // Reference to "users" collection
      const usersQuery = query(usersCollection, orderBy("points", "desc")); // Query to order users by points
      const querySnapshot = await getDocs(usersQuery);

      const usersList = querySnapshot.docs.map((doc, index) => {
        const lastMatchDate = doc.data().lastMatchDate;

        let formattedDate = "N/A"; // Default value

        if (lastMatchDate) {
          // Check if the lastMatchDate is a Firestore timestamp
          if (lastMatchDate.seconds) {
            // If it's a Firestore Timestamp, format it using date-fns
            formattedDate = format(
              new Date(lastMatchDate.seconds * 1000),
              "dd-MM-yyyy HH:mm:ss"
            );
          } else if (typeof lastMatchDate === "string") {
            // If it's a string, just use it (assuming it's in the correct format)
            formattedDate = lastMatchDate;
          }
        }

        return {
          id: doc.id,
          rank: index + 1,
          username: doc.data().username || "Unknown User",
          points: doc.data().points || 0,
          lastMatchDate: formattedDate,
        };
      });

      setUsers(usersList); // Update users state
    } catch (error) {
      console.error("Error fetching ranking data:", error);
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  // Fetch ranking data on component mount
  useEffect(() => {
    fetchRankingData();
  }, []);

  return (
    <>
      <div className="container-ranking">
        <div className="header-back-ranking">
          <Link to="/">
            <img src={back} alt="Banana Login Signup" />
          </Link>
        </div>

        <div className="hero-text-ranking">
          <p>World Ranking</p>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div>
              <table>
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Username</th>
                    <th>Points</th>
                    <th>Last Match Date</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.rank}</td>
                      <td>{user.username}</td>
                      <td>{user.points}</td>
                      <td>{user.lastMatchDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <div className="footer-game">
        <p>V1.0</p>
        <p>made by: Rosni Farook</p>
      </div>
    </>
  );
};
