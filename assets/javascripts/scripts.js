(function() {
    let apiUrl = "http://localhost:1337/user/";
    $("#successDelete").hide();//hide when page is loaded
    $("#successEdit").hide();
    $("#successAdd").hide();
    $("#editQuest").hide();
    $("#addQuest").hide();
    let selected;
$(function(){

    getQuests(apiUrl);
    function getQuests(tempUrl) {
        //$("tbody").html("");
        $("tbody").empty();
            $.get(tempUrl, function(data){
                quest = data;
                for(let i = 0; i < quest.length; i++){
                  questName = quest[i].questName;
                  questID = quest[i].id;
                  questImgUrl = quest[i].cover;
                  questImg = imageDisplay(questImgUrl);
                  $('tbody').append('<tr class="questRow"><td class="name">'+questName+'</td><td class="image">'+questImg+'</td><td><button type="button" class="remove btn btn-default" data-id="'+questID+'" data-target="'+questName+'">Remove</button></td><td><button type="button" class="edit btn btn-default" data-id="'+questID+'" data-target="'+questName+'">Edit</button></td></tr>');
                  }//end for
              })//end get
      }//end getQuests

      function imageDisplay(tempImg) {
        return '<img src="'+tempImg+'" />';
      }

      $(document).on('click','.remove',function(){
        let userConfirm = confirm("Are you sure you want to delete "+ $(this).attr("data-target"));
        console.log(apiUrl+$(this).attr("data-id"));
        //$(this).data("id");
        if(userConfirm) {
          $.ajax({
            url: apiUrl+$(this).attr("data-id"),
            type: 'DELETE',
            success:function(result){
              getQuests(apiUrl);
              alert("Your quest has been deleted")
              $("#successDelete").slideDown();
            },//end success
            error:function(result){
              alert("Problem with request, quest was not deleted.")
            }
          })
        }

    })

    $("#addLink").click(function(e){
        e.preventDefault();
        $("#addForm :input").prop("disabled", false);//enable fields
        $("#addForm").dialog({
          width: 800,
          title: "Add a New Quest",
          buttons: {
            Submit: function(){
              console.log(apiUrl)
              console.log($("#addQuest").serialize())
              $.post( apiUrl, $("#addQuest").serialize(), function(data){
                  });//end addQuest
              alert("Quest has been added!")
              getQuests(apiUrl);
              $(this).dialog("close");
            },
            Cancel: function(){
              $(this).dialog("close");
            }
          }//end buttons
        })//end dialog
        // $('#addForm').load(this.href).dialog('open');
        //$("#addForm")[0].reset()
      })//end click
      


      //edit code to fix
      $(document).on('click','.edit',function(e){
        e.preventDefault();
        
        $("#editQuest :input").prop("disabled", false);
        selected = $(this).attr("data-id")
        console.log("The item to edit: " + selected)
        $("#editQuest").dialog({
            width: 800,
            title: "Edit This Quest",
            buttons: {
              Submit: function(){
                    $.ajax({
                        url: apiUrl + selected,
                        data: $("#editQuest").serialize(),
                        method: "PUT",
                        success: function(data){
                  
                          //reload student table on success
                          getQuests(apiUrl);
                  
                          //disable form fields again
                          $("#editQuest :input").prop("disabled", true);
                  
                          //reset form back to empty fields
                          $("#editQuest")[0].reset()
                           }//end success
                          })//end ajax
                alert("Quest has been edited!")
                $(this).dialog("close");
              },
              Cancel: function(){
                $("#editQuest :input").prop("disabled", true);
                $(this).dialog("close");
              }
            }//end buttons
          })//end dialog

        $.get(apiUrl+selected, function(data){
          //alert(data.student_id)
            //$('tbody').append('<tr class="questRow"><td class="name">'+questName+'</td><td class="image">'+questImg+'</td><td><button type="button" class="remove btn btn-default" data-id="'+questID+'" data-target="'+questName+'">Remove</button></td><td><button type="button" class="edit btn btn-default" data-id="'+questID+'" data-target="'+questName+'">Edit</button></td></tr>');
            $.each(data, function(key, val){
              let el=$('[name="'+key+'"]');
              let type = el.attr('type');
              el.val(val);
            })//end each    
        })//end get
       
        

        
        //$("#editQuest :input").prop("disabled", false);
      })//end on change
})
})()