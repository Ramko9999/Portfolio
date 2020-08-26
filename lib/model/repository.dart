class Repository{
  String url;
  String name;
  String updated;
  String description;
  String imageUrl = "";
  String status;
  String primaryLang;

  Repository.fromJson(Map data){
    this.url = data["html_url"];
    this.name = data["name"];
    List<String> splitDesc = data["description"].split(";");
    if(splitDesc.length < 3){
      this.status = "NOT-READY";
    }
    else{
      if(splitDesc[0] != "READY"){
        this.status = "NOT-READY";
      }
      else{
        this.status = "READY";
        this.description = splitDesc[1];
        this.imageUrl = splitDesc[2];
      }
    }
    this.updated = format(DateTime.parse(data["updated_at"]));
    this.primaryLang = data["language"];
  }

  String format(DateTime d){
    List<String> months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
          'August', 'September', 'October', 'November', 'December'];
    return "${months[d.month - 1]} ${d.day} ${d.year}";
  }
  

  String toString(){
    return "URL: $url NAME: $name DESC: $description LAST-UPDATED: $updated";
  }
}