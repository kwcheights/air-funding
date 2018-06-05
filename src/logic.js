function renderTravels() {
  for (var i = 0; i<travelsData.length; i++){
    let data = travelsData[i];
    console.log(data);
    $('.list-group').prepend(
        `<a id=`+data.InArrayIndex+` href='#' class='list-group-item'>
        <div class='media col-md-3'>
        <figure class='pull-left'>
        <img class='media-object img-rounded img-responsive' src=`+data.img+ `>
        </figure>
        </div>
        <div class='col-md-6'>
        <h2 class='list-group-item-heading'>` + data.title +`</h2>
        </div>
        <div class='col-md-6'>
        <p class='list-group-item-text'> CLOSED:` + data.closed +  `</p>
        </div>
        <div class='col-md-3 text-center'>
        <h4>` + data.numberOfContributors + `<small> contributors </small></h4>
        <input type="text" id="amount`+data.InArrayIndex+`" name="fund_input" placeholder="Insert your donation in ether">
        <button type='button' class='btn btn-primary btn-lg btn-block' title="primary" id="fund`+ data.InArrayIndex+`">Fund Now!</button>
        <button type='button' class="btn btn-danger" title="danger" id="abort`+ data.InArrayIndex+`">Close</button>
        <p>` + web3.fromWei(data.balance,'ether') + `<small> / </small>` + web3.fromWei(data.goal,'ether') + ` Ether reached</p>
        </div>
        </a>`
        );
    $("#fund"+data.InArrayIndex).click(function () {
    fundTravel(data.id, document.getElementById('amount'+data.InArrayIndex).value);
  });
    $("#abort"+data.InArrayIndex).click(function () {
    abortTravel(data.id);
  });
  }
  return new Promise(function(resolve, reject){
    resolve(true);
    reject(false);
  })
}

function fundTravel(travelId, amount) {
        air.deposit.sendTransaction(travelId, {
        from:web3.eth.coinbase,
        value:web3.toWei(amount, "ether"),
        gas: 6654755,
        gasPrice: 40
      }, function(error, result) {
        if (!error) {
          console.log(result);
        } else {
          console.log(error);
        }
      });
    }

function abortTravel(travelId) {
        air.abortTravel(travelId, function(error, result) {
          if (!error) {
          alert('Fund closed, travel aborted')
          } else {
              console.log(error);
              alert("This travel is closed and/or you're not the owner")
            }
          });
}

function renderTravel(data) {
    console.log(data);
    $('.list-group').prepend(
        `<a id=`+data.img+` href='#' class='list-group-item'>
        <div class='media col-md-3'>
        <figure class='pull-left'>
        <img class='media-object img-rounded img-responsive' src='http://placehold.it/350x250' alt='placehold.it/350x250' >
        </figure>
        </div>
        <div class='col-md-6'>
        <h4 class='list-group-item-heading'>` + data.title +`</h4>
        <p class='list-group-item-text'>` + data.description +  `/p>
        </div>
        <div class='col-md-3 text-center'>
        <h2>` + data['numberOfContributors'] + `<small> contributors </small></h2>
        <button type='button' class='btn btn-primary btn-lg btn-block'>Fund Now!</button>
        <div class='stars'>
        <span class='glyphicon glyphicon-star'></span>
        <span class='glyphicon glyphicon-star'></span>
        <span class='glyphicon glyphicon-star'></span>
        <span class='glyphicon glyphicon-star'></span>
        <span class='glyphicon glyphicon-star-empty'></span>
        </div>
        <p>` + data.balance + `<small> / </small>` + data.goal + ` Ether reached</p>
        </div>
        </a>`
        );
  
}

function createTravel() {
  var url = '';
  const reader = new FileReader();
  const photo = document.getElementById("img");
  var travelId = sha3_256(document.getElementById('dest').value + web3.eth.coinbase);

  reader.readAsArrayBuffer(photo.files[0]);   
  reader.onloadend = function() {
        //const ipfs = window.IpfsApi('ipfs.infura.io', 5001, {protocol: 'https'}) // Connect to IPFS
         // Connect to IPFS
         const buf = buffer.Buffer(reader.result)
        console.log(buf); // Convert data into buffer
        ipfs.files.add(buf, function(err, result) { // Upload buffer to IPFS
          if(err) {
            console.error(err)
            return
          }
          //url = `https://ipfs.io/ipfs/${result[0].hash}`
          url = result[0].hash
          console.log(`Url --> ${url}`)
          air.createTravel(travelId, 
            document.getElementById('title').value, 
            web3.eth.coinbase, 
            web3.toWei(document.getElementById('goal').value, "ether"), 
            document.getElementById('dest').value, 
            document.getElementById('desc').value,
            Date.now(),
            document.getElementById('exp').value,
            url, function(error, result) {
              if (!error) {
                console.log(result);
              } else {
                console.log(error);
              }
            });
        })
      }
    }

// ---
// ---
// ---
function getTravelById(travelId) {
  return new Promise( resolve =>{
     var travelData = {id:travelId};
      air.getTravelTitle(travelId, function(error, result) {
        if (!error) {
          travelData.title = result;
          air.getTravelOwner(travelId, function(error, result) {
            if (!error) {
              travelData.owner = result;
              //resolve(travelData);
              air.getTravelGoal(travelId, function(error, result) {
                if (!error) {
                  travelData.goal = result;
                  air.getTravelBalance(travelId, function(error, result) {
                    if (!error) {
                    travelData.balance = result;
                    air.getTravelIsClosed(travelId, function(error, result) {
                      if (!error) {
                        travelData.closed = result;
                        air.getTravelImage(travelId, function(error, url) {
                          if (!error) {
                            ipfs.files.cat(url, function(err, img) { // Upload buffer to IPFS
                              if(err) {
                                console.log(err)
                              } else {
                                var blob = new Blob([img], {type:"image/jpg"});
                                var img_url = window.URL.createObjectURL(blob);
                                travelData.img = img_url;
                              }
                            });
                            air.getTravelDescription(travelId, function(error, result) {
                              if (!error) {
                                travelData.description = result;
                                air.getTravelStartDate(travelId, function(error, result) {
                                  if (!error) {
                                    travelData.start = result;
                                    air.getTravelExpirationDate(travelId, function(error, result) {
                                      if (!error) {
                                        travelData.expiration = result;
                                        air.getNumberOfContributors(travelId, function(error, result) {
                                          if (!error) {
                                            travelData.numberOfContributors = result;
                                            air.getTravelInArrayIndex(travelId, function(error, result) {
                                              if (!error) {
                                                travelData.InArrayIndex = result;
                                                resolve(travelData);
                                              } else {
                                                console.log(error);
                                              }
                                            });
                                          } else {
                                            console.log(error);
                                          }
                                        });
                                      } else {
                                        console.log(error);
                                      }
                                    });
                                  } else {
                                    console.log(error);
                                  }
                                });
                              } else {
                                console.log(error);
                              }
                            });
                          } else {
                            console.log(error);
                          }
                        });
                      } else {
                        console.log(error);
                      }
                    });
                    } else {
                      console.log(error);
                    }
                  });
                } else {
                  console.log(error);
                }
              });
            } else {
              console.log(error);
            }
          });
        } else {
          console.log(error);
        }
      });
      return travelData; 
  });
}

function getTravelByIndex(index) {
  return new Promise(resolve =>{
    air.getTravelId(index, function(error, id) {
      if (!error) {
          getTravelById(id).then(traveldata=>{
          traveldata._index=index;
          resolve(traveldata);
        })
      } else {
        console.log(error);
      }
    })
  });
}

function getNumberOfTravels() {
  return new Promise(resolve=>{
    air.getNumberOfTravels(function(error, numberOfTravels) {
      if (!error)
        resolve(numberOfTravels);
      else
        console.log(error);
    })
  });
}

async function getTravelList() {
  var travelList=[],numberOfTravels=0;
  await getNumberOfTravels().then(a=>{
    numberOfTravels=a
  });
  for(var i=0; i<numberOfTravels; i++) {
    await getTravelByIndex(i).then(data=>{
      travelList.push(data);
    });
  };
  return travelList;
}
  
function renderTravelList(travelList){
  var status;
  for(let t=0; t<travelList.length; t++){
    if(!travelList[t].closed){
      status='OPEN'
    } else{
      status='CLOSED'
    }
    $('.list-group').prepend(
      `<a href="#" class="list-group-item" id="travelexample" id="travel`+travelList[t].InArrayIndex+`">
                <div class="media col-md-3">
                    <figure class="pull-left">
                        <img class="media-object img-rounded img-responsive"  src="`+"https://media-cdn.tripadvisor.com/media/photo-s/06/5b/f4/fb/view-from-the-top.jpg"+/*+travelList[t].img+*/`" heigth="250" width="350">
                    </figure>
                </div>
                <div class="col-md-6">
                    <h4 class="list-group-item-heading">`+travelList[t].title+`</h4>
                    <p class="list-group-item-text"> `+travelList[t].description+` </p>
                    <div class="stars">
                      <p>Status: <small><b>`+status+`</b></small> with <b>`+travelList[t].numberOfContributors+`</b> contributors</p>
                    </div>  
                </div>
                <div class="col-md-3 text-center">
                    <h2> `+web3.fromWei(travelList[t].balance,'ether')+` / `+web3.fromWei(travelList[t].goal,'ether')+`<small> ether </small></h2>
                    <button type="button" class="btn btn-primary btn-lg btn-block">Fund now!</button>
                    <button type="button" class="btn btn-danger btn-lg btn-block">Close</button>
                    <div class="stars">
                      <p> Expiration <small> : </small> `+travelList[t].expiration+` </p>  
                    </div>   
                </div>
          </a>`
    );
  }
}