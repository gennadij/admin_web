package org.admin.websocket;

import java.io.IOException;

import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

@ServerEndpoint(value = "/client")
public class Websocket {

	@OnOpen
	public void open(Session session){
		System.out.println("|========================================================");
		System.out.println("Connection to Client is opend");
//		try {
//			session.getBasicRemote().sendText("Hallo Client");
//		} catch (IOException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
		
	}

	@OnClose
	public void onclose(Session session){
		System.out.println("Connection to Client is closed");
		try {
			session.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	@OnMessage
	public void textMessage(String msg, Session session){
		
		System.out.println("WebsocketToClient: | <--- | " + msg);
		
		session.getAsyncRemote().sendText(msg);
	}
}