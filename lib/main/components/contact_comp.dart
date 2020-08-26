import 'dart:convert';
import 'dart:core';
import 'package:universal_html/html.dart' as html;
import "package:flutter/material.dart";
import 'package:http/http.dart';
import 'package:portfolio/util/config.dart';

class ContactComponent extends StatefulWidget {
  @override
  _ContactComponentState createState() => _ContactComponentState();
}

class _ContactComponentState extends State<ContactComponent> {
  Widget build(BuildContext context) {
    double sW = MediaQuery.of(context).size.width;
    double sH = MediaQuery.of(context).size.height;

    return SingleChildScrollView(
      child: Container(
        width: sW,
        height: sH * 0.9,
        color: Colors.blue,
        child: Padding(
          padding: EdgeInsets.only(top: sH * 0.01),
          child: Align(
            alignment: Alignment.center,
            child: Container(
              decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(sW * 0.01)),
              width: sW * 0.3,
              height: sH * 0.6,
              child: Column(
                children: <Widget>[
                  Container(
                    height: sH * 0.04,
                  ),
                  Container(
                    child: Text(
                      "Contact Me",
                      style: TextStyle(
                          fontFamily: "Montserrat",
                          color: Colors.black,
                          fontSize: 36),
                    ),
                  ),
                  Container(
                    height: sH * 0.01,
                  ),
                  Container(
                    child: Text("Let me know how I can help you"),
                  ),
                  Container(
                    height: sH * 0.1,
                  ),
                  Container(
                    child: ContactFlow(),
                  )
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class ContactFlow extends StatefulWidget {
  @override
  _ContactFlowState createState() => _ContactFlowState();
}

class _ContactFlowState extends State<ContactFlow> {
  Map<String, String> data = {"FROM": "", "SUBJECT": "", "BODY": ""};
  List<String> processes = ["FROM", "SUBJECT", "BODY", "FINISH"];
  final appContainer = html.window.document.getElementById("app-container");

  int flowPhase = 0;

  void forwardWidget() {
    setState(() => flowPhase += 1);
  }

  void backwardWidget() {
    setState(() => flowPhase -= 1);
  }

  Widget getWidget(BuildContext context) {
    switch (this.processes[this.flowPhase]) {
      case "FROM":
        return getFromWidget(context);
      case "SUBJECT":
        return getSubjectWidget(context);
      case "BODY":
        return getMessageWidget(context);
      default:
        return getFinishWidget(context);
    }
  }

  Widget getSubjectWidget(BuildContext context) {
    double sW = MediaQuery.of(context).size.width;
    double sH = MediaQuery.of(context).size.height;
    TextEditingController subjectController = TextEditingController();
    subjectController.text = data["SUBJECT"];
    return Container(
      width: sW * 0.3,
      child: Align(
          alignment: Alignment.center,
          child: Container(
            width: sW * 0.1,
            height: sH * 0.1,
            child: MouseRegion(
              onHover: (var p) {
                appContainer.style.cursor = "Text";
              },
              onExit: (var p) {
                appContainer.style.cursor = 'default';
              },
              child: TextField(
                  style: TextStyle(fontFamily: "Montserrat", fontSize: 12),
                  controller: subjectController,
                  decoration: InputDecoration(labelText: "Enter Subject"),
                  onSubmitted: (String s) {
                    data["SUBJECT"] = s;
                  }),
            ),
          )),
    );
  }

  Widget getFromWidget(BuildContext context) {
    double sW = MediaQuery.of(context).size.width;
    double sH = MediaQuery.of(context).size.height;
    TextEditingController fromController = TextEditingController();
    fromController.text = data["FROM"].trim();
    return Container(
      width: sW * 0.3,
      child: Align(
          alignment: Alignment.center,
          child: Container(
            width: sW * 0.1,
            height: sH * 0.1,
            child: MouseRegion(
              onHover: (var p) {
                appContainer.style.cursor = "Text";
              },
              onExit: (var p) {
                appContainer.style.cursor = 'default';
              },
              child: TextFormField(
                  style: TextStyle(
                    fontFamily: "Montserrat",
                    fontSize: 12,
                  ),
                  controller: fromController,
                  decoration: InputDecoration(labelText: "Enter Email Address"),
                  onFieldSubmitted: (String s) {
                    data["FROM"] = s.trim();
                  }),
            ),
          )),
    );
  }

  Widget getMessageWidget(BuildContext context) {
    double sW = MediaQuery.of(context).size.width;
    double sH = MediaQuery.of(context).size.height;
    TextEditingController bodyController = TextEditingController();
    bodyController.text = data["BODY"].trim();
    return Container(
      width: sW * 0.3,
      child: Align(
          alignment: Alignment.center,
          child: Container(
            width: sW * 0.1,
            height: sH * 0.2,
            child: MouseRegion(
              onHover: (var p) {
                appContainer.style.cursor = "Text";
              },
              onExit: (var p) {
                appContainer.style.cursor = 'default';
              },
              child: TextFormField(
                  keyboardType: TextInputType.text,
                  maxLines: null,
                  style: TextStyle(fontFamily: "Montserrat", fontSize: 12),
                  controller: bodyController,
                  decoration: InputDecoration(labelText: "Enter Message"),
                  onFieldSubmitted: (String s) {
                    setState(() => data["BODY"] = s.trim());
                  }),
            ),
          )),
    );
  }

  
  Future<String> sendEmail(Map data) async {
    final mailResponse = await post(ServiceApi.getEmailUrl(), 
      body: json.encode(data), headers: {
      "Accept": "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    });
    return mailResponse.body;
  }
  

  Widget getFinishWidget(BuildContext context) {
    double sW = MediaQuery.of(context).size.width;
    double sH = MediaQuery.of(context).size.height;
    return FutureBuilder(
      future: sendEmail(data),
      builder: (BuildContext context, var snapshot) {
        if (snapshot.hasData) {
          Map respData = json.decode(snapshot.data);
          if (!respData["error"]) {
            //if there is not error with response from backend
            return Container(
              width: sW * 0.3,
              height: sH * 0.3,
              child: Center(
                  child: Text(
                "Thank You For Reaching Out",
                style: TextStyle(fontFamily: "Montserrat", fontSize: 24),
              )),
            );
          } else {
            return Container(
              width: sW * 0.3,
              height: sH * 0.3,
              child: Center(
                  child: Text(
                "Unable To Send Email",
                style: TextStyle(fontFamily: "Montserrat", fontSize: 24),
              )),
            );
          }
        } else {
          return Container(
            width: sW * 0.3,
            height: sH * 0.3,
            child: Center(
              child: Align(
                child: Container(
                    width: sW * 0.15,
                    height: sH * 0.05,
                    child: LinearProgressIndicator()),
              ),
            ),
          );
        }
      },
    );
  }

  Widget renderArrows(BuildContext context) {
    double sW = MediaQuery.of(context).size.width;
    double sH = MediaQuery.of(context).size.height;

    bool isFirstField = this.flowPhase == 0;
    bool areAllKeysFilled = true;
    this.data.forEach((k, v) {
      if (v.trim().length == 0) {
        areAllKeysFilled = false;
      }
    });

    Color backgroundColor;
    Color foregroundColor;

    if (this.flowPhase == 2) {
      if (areAllKeysFilled) {
        backgroundColor = Colors.green;
        foregroundColor = Colors.white;
      } else {
        backgroundColor = Colors.grey;
        foregroundColor = Colors.black;
      }
    } else {
      backgroundColor = Colors.blue;
      foregroundColor = Colors.white;
    }

    bool validToSend =
        (this.flowPhase == 2 && areAllKeysFilled) || this.flowPhase != 2;

    return Container(
      width: sW * 0.2,
      height: sH * 0.1,
      child: Row(
        children: <Widget>[
          Container(
            width: (sW * 0.045),
          ),
          ClipOval(
            child: Material(
              color: isFirstField ? Colors.grey : Colors.blue, // button color
              child: InkWell(
                child: SizedBox(
                  width: sW * 0.03,
                  height: sW * 0.03,
                  child: Icon(
                    Icons.arrow_left,
                    color: isFirstField ? Colors.black : Colors.white,
                  ),
                ),
                onTap: isFirstField ? null : backwardWidget,
              ),
            ),
          ),
          Container(
            width: sW * 0.05,
          ),
          ClipOval(
            child: Material(
              color: backgroundColor,
              child: InkWell(
                child: SizedBox(
                    width: sW * 0.03,
                    height: sW * 0.03,
                    child: Icon(
                      Icons.arrow_right,
                      color: foregroundColor,
                    )),
                onTap: validToSend ? forwardWidget : null,
              ),
            ),
          ),
          Container(
            width: (sW * 0.045),
          ),
        ],
      ),
    );
  }

  Widget build(BuildContext context) {
    double sW = MediaQuery.of(context).size.width;
    double sH = MediaQuery.of(context).size.height;

    return Container(
        child: Column(
      children: <Widget>[
        getWidget(context),
        Container(
          width: sW * 0.3,
          child: this.flowPhase == 3 ? Container() : renderArrows(context),
          alignment: Alignment.center,
        ),
      ],
    ));
  }
}
