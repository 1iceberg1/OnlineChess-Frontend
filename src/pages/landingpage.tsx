import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import "../assets/css/bootstrap.css"
import Board from "../components/board";
import Controls from "../components/controls";
import GameSession from "../lib/session";
import Header from "../components/header";

export const LandingPage = () => {

  const [game, setGame] = useState<GameSession>();

  useEffect(() => {
    setGame(new GameSession(true));
  }, []);

  return(
    <>
      <div className="chess-session">
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <div className="chess-class-rect flex-container">
              <div className="chess-teacher-rect chess-edu-rect">
                <span>Teacher</span>
              </div>
              <div className="chess-student-rect chess-edu-rect">
                <span className="text-center">St 1</span>
              </div>
              <div className="chess-student-rect chess-edu-rect">
                <span className="text-center">St 2</span>
              </div>
              <div className="chess-student-rect chess-edu-rect">
                <span className="text-center">St 3</span>
              </div>
              <div className="chess-student-rect chess-edu-rect">
                <span className="text-center">St 4</span>
              </div>
              <div className="chess-student-rect chess-edu-rect">
                <span className="text-center">St 5</span>
              </div>
              <div className="chess-student-rect chess-edu-rect">
                <span className="text-center">St 6</span>
              </div>
              <div className="chess-student-rect chess-edu-rect">
                <span className="text-center">St 7</span>
              </div>
              <div className="chess-student-rect chess-edu-rect">
                <span className="text-center">St 8</span>
              </div>
            </div>
          </Grid>
          <Grid item xs={2}>
            <div className="px-3 py-4">
              <div className="chess-lesson-rect">
                <span>Закончить урок</span>
              </div>
              <div className="chess-lesson-rect">
                <span>История</span>
              </div>
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className="chess-chapter-rect">
              <div className="chess-chapter-title chess-title">
                <div className="chess-title-text">Глава</div>
              </div>
              <div className="table-responsive chess-chapter-table">
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <th scope="row">
                        <span className="chess-table-row">
                          1
                        </span>
                      </th>
                      <td>Глава 1</td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <span className="chess-table-row">
                          2
                        </span>
                      </th>
                      <td>Глава 2</td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <span className="chess-table-row">
                          3
                        </span>
                      </th>
                      <td>Глава 3</td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <span className="chess-table-row">
                          4
                        </span>
                      </th>
                      <td>Глава 4</td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <span className="chess-table-row">
                          5
                        </span>
                      </th>
                      <td>Глава 5</td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <span className="chess-table-row">
                          6
                        </span>
                      </th>
                      <td>Глава 6</td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <span className="chess-table-row">
                          7
                        </span>
                      </th>
                      <td>Глава 7</td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <span className="chess-table-row">
                          8
                        </span>
                      </th>
                      <td>Глава 8</td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <span className="chess-table-row">
                          9
                        </span>
                      </th>
                      <td>Глава 9</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="chess-chat-rect">
              <div className="chess-chat-title chess-title">
                <div className="chess-title-text">Чат</div>
              </div>
              <div className="chess-chat-box">
              </div>
            </div>
          </Grid>
          <Grid item xs={5}>
            <div className="chess-board">
              {
                game ? (
                  <div className="chess" id="container">
                    <Header game={game} />
                    <Board game={game} />
                    <Controls game={game} />
                  </div>
                ) : <></>
              }
            </div>
          </Grid>
          <Grid item xs={4}>
          </Grid>
        </Grid>
      </div>
    </>
  )
}