// SocketContext.js
import { ActionTypes, SnakesCTXAction } from "@/components/Snakes/SnakesCTX";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Socket, io } from "socket.io-client";

const SocketContext = createContext<{
  socket: Socket | null;
  sockEvent: SnakesCTXAction | null;
}>({ socket: null, sockEvent: null });

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [sockEvent, setSockEvent] = useState<SnakesCTXAction | null>(null);
  useEffect(() => {
    // Replace 'http://localhost:3000' with your Socket.IO server URL
    if (typeof window === undefined) return;
    const location = window.location;
    console.log(location);
    const socketInstance = io(location.origin);
    // const socketInstance = io("http://localhost:3000"); // Development
    createSocketHandlers(socketInstance);
    setSocket(socketInstance);

    // Clean up the socket connection on unmount
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const createSocketHandlers = (socket: Socket) => {
    socket.on("connect", () => {
      socket.on("game_joined", (msg: string) => {
        try {
          const body = JSON.parse(msg);
          setSockEvent({ type: ActionTypes.GAME_JOINED, payload: body });
        } catch (e) {
          console.error(e);
        }
      });
      socket.on("game_updated", (msg: string) => {
        try {
          const body = JSON.parse(msg);
          setSockEvent({ type: ActionTypes.GAME_UPDATED, payload: body });
        } catch (e) {
          console.error(e);
        }
      });
    });
  };

  return (
    <SocketContext.Provider value={{ socket, sockEvent }}>
      {children}
    </SocketContext.Provider>
  );
};
