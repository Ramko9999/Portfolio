import "package:flutter/material.dart";
import 'package:universal_html/html.dart' as html;
import 'package:url_launcher/url_launcher.dart';
import 'components/contact_comp.dart';
import 'components/project_comp.dart';

class MainPage extends StatefulWidget {
  @override
  _MainPageState createState() => _MainPageState();
}

class _MainPageState extends State<MainPage> {
  Widget _displayingWidget = ProjectComponent();
  String _currentWidget = "PROJECT";
  final appContainer = html.window.document.getElementById("app-container");

  void navigate(String target, BuildContext context) {
    if (target != _currentWidget) {
      switch (target) {
        case "PROJECT":
          setState(() {
            _displayingWidget = ProjectComponent();
            _currentWidget = "PROJECT";
          });
          break;
        case "CONTACT":
          setState(() {
            _displayingWidget = ContactComponent();
            _currentWidget = "CONTACT";
          });
          break;
        default:
          //TODO: Make blogs page
          setState(() => _displayingWidget = Container(
                color: Colors.green,
              ));
      }
    }
  }

  Widget build(BuildContext context) {
    double sW = MediaQuery.of(context).size.width;
    double sH = MediaQuery.of(context).size.height;

    return Scaffold(
        body: Container(
      child: Column(
        children: <Widget>[
          Container(
            color: Colors.black,
            height: sH * 0.1,
            width: sW,
            child: Row(
              children: <Widget>[
                Container(
                  width: sW * 0.05,
                ),
                MouseRegion(
                  onHover: (var p) {
                    appContainer.style.cursor = "Pointer";
                  },
                  onExit: (var p) {
                    appContainer.style.cursor = 'default';
                  },
                  child: FlatButton(
                    child: Text(
                      "Projects",
                      style: TextStyle(
                          fontFamily: "Montserrat",
                          color: Colors.white,
                          fontSize: 24),
                    ),
                    onPressed: () => navigate("PROJECT", context),
                  ),
                ),
                Container(
                  width: sW * 0.05,
                ),
                MouseRegion(
                  onHover: (var p) {
                    appContainer.style.cursor = "Pointer";
                  },
                  onExit: (var p) {
                    appContainer.style.cursor = 'default';
                  },
                  child: FlatButton(
                    child: Text(
                      "Contact",
                      style: TextStyle(
                          fontFamily: "Montserrat",
                          color: Colors.white,
                          fontSize: 24),
                    ),
                    onPressed: () => navigate("CONTACT", context),
                  ),
                ),
                Container(
                  width: sW * 0.15,
                ),
                Container(
                  child: Text("Ramki Pitchala", 
                  style: TextStyle(
                    fontFamily: "Montserrat",
                    color: Colors.white,
                    fontSize: 28
                  ),),
                ),
                Container(
                  width: sW * 0.2,
                ),
                Container(
                  alignment: Alignment.center,
                  child: MouseRegion(
                      onHover: (var p) {
                        appContainer.style.cursor = "Pointer";
                      },
                      onExit: (var p) {
                        appContainer.style.cursor = 'default';
                      },
                      child: FlatButton(
                          onPressed: () async {
                            String url = "https://github.com/Ramko9999";
                            if (await canLaunch(url)) {
                              await launch(url);
                            }
                          },
                          child: Text(
                            "Github",
                            style: TextStyle(
                                fontFamily: "Montserrat", color: Colors.white),
                          ))),
                ),
                Container(
                  child: MouseRegion(
                      onHover: (var p) {
                        appContainer.style.cursor = "Pointer";
                      },
                      onExit: (var p) {
                        appContainer.style.cursor = 'default';
                      },
                      child: FlatButton(
                          onPressed: () async {
                            String url =
                                "https://www.linkedin.com/in/rama-krishna-pitchala-532a48158/";
                            if (await canLaunch(url)) {
                              await launch(url);
                            }
                          },
                          child: Text(
                            "LinkedIN",
                            style: TextStyle(
                                fontFamily: "Montserrat", color: Colors.white),
                          ))),
                ),
              ],
            ),
          ),
          Container(child: _displayingWidget),
        ],
      ),
    ));
  }
}
