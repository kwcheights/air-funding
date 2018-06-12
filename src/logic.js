function fundTravel(travelId, amount) {
  return new Promise((resolve,reject)=>{
    air.deposit.sendTransaction(travelId, {
      from:web3.eth.coinbase,
      value:web3.toWei(amount, "finney"),
      gas: 6654755,
      gasPrice: 40
    }, function(error, result) {
      if (!error) {
        console.log('> funded');
        resolve(result)
      } else {
        reject(error)
      }
    });
  });
}

function abortTravel(travelId) {
        air.abortTravel(travelId, function(error, result) {
          if (!error) {
          alert('Fund closed, travel aborted')
          } else {
              console.log('> abort rejected/failed');
            }
          });
}

function storeTravel(_id, _title, _goal, _dest, _desc, _exp, _img) {
  return new Promise(resolve=>{
    var url = '';
    const reader = new FileReader();
    const photo = _img;
    reader.readAsArrayBuffer(photo.files[0]);   
    reader.onloadend = function() {
      const buf = buffer.Buffer(reader.result)
      console.log(buf); 
      ipfs.files.add(buf, function(err, result) { 
        if(err) {
          console.error('> ipfs storing error')
        } else {
          url = result[0].hash
          //console.log(`Url --> ${url}`)
          air.createTravel(_id, _title, web3.eth.coinbase, _goal, _dest, _desc,moment().format("D MMMM YYYY"),_exp,url, function(error, result) {
            if (!error) {
              console.log('> travel created')
              resolve(result);
            } else {
              console.log('> creating failed');
            }
          });
        }
      });
    }
  });
}

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
                                console.log(err);
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
