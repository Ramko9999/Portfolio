import 'dart:convert';

import "package:flutter/material.dart";
import 'package:http/http.dart';
import 'package:portfolio/model/repository.dart';
import 'package:portfolio/util/color_scheme.dart';
import 'package:url_launcher/url_launcher.dart';
import "package:universal_html/html.dart" as html;

class ProjectComponent extends StatelessWidget {
  Future<List> getRepos() async {
    String endpoint = "https:api.github.com/users/Ramko9999/repos";
    Response userRepoResponse = await get(endpoint);
    return [userRepoResponse.body];
  }

  Widget buildRepoColumn(
      BuildContext context, List<Repository> repos, int rowSize) {
    double sW = MediaQuery.of(context).size.width;
    double sH = MediaQuery.of(context).size.height;

    List<List<Widget>> repoColumn = [];
    List<Widget> repoList = [];
    for (int i = 0; i < rowSize; i++) {
      repoColumn.add([]);
    }

    int k = 0;
    for (int i = 0; i < repos.length; i++) {
      repoColumn[k].add(RepositoryComponent(repos[i]));
      repoColumn[k].add(Container(
        height: sH * 0.05,
      ));
      k = (k + 1) % rowSize;
    }

    repoColumn.forEach((f) {
      repoList.add(
        Container(
          width: sW / rowSize,
          child: Column(
            children: f,
          ),
        ),
      );
    });

    return Row(
      children: repoList,
    );
  }

  Widget build(BuildContext context) {
    double sW = MediaQuery.of(context).size.width;
    double sH = MediaQuery.of(context).size.height;
    return FutureBuilder(
        future: getRepos(),
        builder: (context, snapshot) {
          if (snapshot.hasData) {
            if (snapshot.data.length > 0) {
              List userRepoData = json.decode(snapshot.data[0]);

              //grab only repos that are ready to be shown
              List<Repository> repos = userRepoData
                  .map((f) => Repository.fromJson(f))
                  .where((f) => f.status == "READY")
                  .toList();

              return Container(
                  color: Colors.blue,
                  child: Column(
                    children: <Widget>[
                      Container(
                        height: sH * 0.02,
                      ),
                      Container(
                        height: sH * 0.78,
                        child: SingleChildScrollView(
                            child: buildRepoColumn(context, repos, 2)),
                      ),
                    ],
                  ));
            } else {
              return Text("Error");
            }
          } else {
            return Container(
              height: sH * 0.7,
              width: sW * 0.2,
              child: Center(
                child: Column(
                  children: <Widget>[
                    Container(
                      height: sH * 0.3,
                    ),
                    Center(
                      child: Text(
                        "Loading...",
                        style: TextStyle(
                          fontFamily: "Montserrat",
                          fontSize: 45
                        ),
                      ),
                    ),
                    Center(
                      child: LinearProgressIndicator(),
                    ),
                  ],
                ),
              ),
            );
          }
        });
  }
}

class RepositoryComponent extends StatelessWidget {
  final Repository _repo;

  RepositoryComponent(this._repo);

  Widget build(BuildContext context) {
    double sW = MediaQuery.of(context).size.width;
    double sH = MediaQuery.of(context).size.height;
    final appContainer = html.window.document.getElementById("app-container");

    return Container(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(15),
        color: Colors.white,
      ),
      width: sW * 0.4,
      height: sH * 0.5,
      child: Column(
        children: <Widget>[
          Container(
            height: sH * 0.1,
            color: LanguageScheme.getColor(_repo.primaryLang),
            child: Center(
              child: Text(
                _repo.name,
                style: TextStyle(
                    color: Colors.white,
                    fontFamily: "Montserrat",
                    fontSize: 36),
              ),
            ),
          ),
          Row(
            children: <Widget>[
              Container(
                child: Container(
                    child: Center(
                  child: Container(
                    color: Colors.black,
                    child: Image.network(_repo.imageUrl),
                    width: sW * 0.2,
                    height: sH * 0.4,
                  ),
                )),
              ),
              Container(
                width: sW * 0.02,
              ),
              Column(
                children: <Widget>[
                  Container(
                    width: sW * 0.18,
                    height: sH * 0.3,
                    child: Align(
                      alignment: Alignment.topCenter,
                      child: Text(
                        _repo.description,
                        softWrap: true,
                        style: TextStyle(
                          color: Colors.black,
                          fontFamily: "Montserrat",
                        ),
                      ),
                    ),
                  ),
                  Container(
                    width: sW * 0.15,
                    child: Text(
                      "Last Updated ${_repo.updated}",
                      style: TextStyle(
                        fontFamily: "Montserrat",
                        fontSize: 13,
                      ),
                    ),
                  ),
                  Container(
                    width: sW * 0.15,
                    child: MouseRegion(
                      onHover: (var p) {
                        appContainer.style.cursor = "Pointer";
                      },
                      onExit: (var p) {
                        appContainer.style.cursor = 'default';
                      },
                      child: FlatButton(
                          onPressed: () async {
                            if (await canLaunch(_repo.url)) {
                              await launch(_repo.url);
                            }
                          },
                          child: Text(
                            "Source Code",
                            style: TextStyle(
                                fontFamily: "Montserrat", color: Colors.blue),
                          )),
                    ),
                  )
                ],
              )
            ],
          ),
        ],
      ),
    );
  }
}
