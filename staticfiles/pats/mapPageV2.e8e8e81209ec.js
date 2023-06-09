require(["esri/Map",
        "esri/views/MapView",
        "esri/layers/FeatureLayer",
        "esri/layers/MapImageLayer",
        "esri/widgets/Legend",
        "esri/rest/support/Query",
        "esri/widgets/Search",
        "esri/widgets/Legend"
    ],

    (Map,
        MapView,
        FeatureLayer,
        MapImageLayer,
        Legend,
        Query,
        Search) => {



        const map = new Map({
            basemap: "topo-vector"
        });

        var lat = 44.30291;
        var long = -120.84585;

        const view = new MapView({
            container: "viewDiv",
            map: map,
            zoom: 14,
            center: [long, lat] // longitude, latitude
        });

        const subdivisionRenderer = {
            type: "simple", // autocasts as new SimpleRenderer()
            symbol: {
              type: "simple-fill", // autocasts as new SimpleFillSymbol()
              style: "none",
              outline: { color: [165, 19, 200, 1] },
              color: [245, 208, 253, 0.5]
            },
            label: "Subdivisions"
          };



        // add feature from MapServer
        const landGroup = new MapImageLayer({
            url: "https://geo.co.crook.or.us/server/rest/services/publicApp/landGroup/MapServer",
            sublayers: [{
                    id: 0,
                    renderer: subdivisionRenderer,
                    visible: false,
                    labelingInfo: [
                        {
                          labelExpression: "[name]",
                          labelPlacement: "always-horizontal",
                          symbol: {
                            type: "text", // autocasts as new TextSymbol()
                            color: [255, 255, 255, 0.7],
                            haloColor: [0, 0, 0, 0.7],
                            haloSize: 1,
                            font: {
                              size: 18
                            }
                          },
                        //   minScale: 2400000,
                        //   maxScale: 73000
                        }
                      ],
                    popupTemplate: {
                        title: "Subdivision: {name}"
                    },
                    
                },
                {
                    id: 1,
                    visible: true,
                    popupTemplate: {
                        title: "{MAPTAXLOT}",
                        content: "Owner Name: {OWNER_NAME} <br /> Zone: {ZONE} <br /> Account: {ACCOUNT} <br /> PATS Link: <a href={PATS_LINK}>PATS Link</a> <br /> Tax Map Link: <a href={TAX_MAP_LINK}>Tax Map Link</a> <br /> Tax Card Link: <a href={TAX_CARD_LINK}>Tax Card Link</a>",
                    }
                },
                {
                  id: 3,
                  visible: false
                },
                {
                  id: 4,
                  visible: false
                },
                {
                  id: 5,
                  visible: false
                },
                {
                    id: 6,
                    visible: false,
                    opacity: 0.6
                },
                {
                    id: 7,
                    visible: true,
                    opacity: 0.5
                }
            ]
        });

        const districtsGroup = new MapImageLayer({
            url: "https://geo.co.crook.or.us/server/rest/services/publicApp/districtsGroup/MapServer",
            sublayers: [
                {
                  id: 12,
                  visible: false
                }, {
                  id: 0,
                  visible: false
                }, {
                  id: 1,
                  visible: false
                }, {
                  id: 2,
                  visible: false
                }, {
                    id: 3,
                    visible: false
                  },
                  {
                    id: 4,
                    visible: false
                  },
                  {
                    id: 5,
                    visible: false
                  },
                  {
                    id: 6,
                    visible: false
                  },
                  {
                    id: 7,
                    visible: false
                  },
                  {
                    id: 8,
                    visible: false
                  },
                  {
                    id: 9,
                    visible: false
                  },
                  {
                    id: 10,
                    visible: false
                  },
                  {
                    id: 11,
                    visible: false
                  }
              ]
        });

      
        

        const prop = new FeatureLayer({
            url: "https://geo.co.crook.or.us/server/rest/services/Hosted/PATS_property/FeatureServer/0",
            //outFields: ["*"]
        });

        // const transportation = new MapImageLayer({
        //     url: "https://geo.co.crook.or.us/server/rest/services/publicApp/transInfrastructureGroup/MapServer/",
        //     sublayers: [{
        //       id: 0,
        //       visible: true,
        //       popupTemplate: {
        //           title: "Road: {full_add}"
        //       },
        //   },
        //   {
        //       id: 1,
        //       visible: true,
        //       popupTemplate: {
        //           title: "Road: {full_add}"
        //       }
        //   },
        //     ]
        // });

        view.when(() => {
          //map.add(transportation);
          map.add(landGroup);
          map.add(districtsGroup);
          map.add(prop);
      });

      const subdivisions = landGroup.sublayers.getItemAt(0);
      const mtLayer = landGroup.sublayers.getItemAt(1);
      //const taxcodeLayer = landGroup.sublayers.getItemAt(5);
      const pendingLayer = landGroup.sublayers.getItemAt(6);

      // transportation.when(() => {
      //   console.log("should be visible");
      // })

      landGroup.when(() => {

          console.log("Layer loaded successfully");
          

          var checkBoxLandGroup = document.getElementById("checkBoxLayer");
         // var checkBoxRoads = document.getElementById("checkBoxRoads");
          var checkBoxSubdivision = document.getElementById("subdivisions");
          var checkBoxTaxlots = document.getElementById("taxlots");
          
          var checkBoxPendingLayer = document.getElementById("pendingLayer");
      

          checkBoxLandGroup.addEventListener("change", function(e) {
            landGroup.visible = e.target.checked;
        });

        // checkBoxRoads.addEventListener("change", function(e) {
        //   transportation.visible = e.target.checked;
        // });

        checkBoxSubdivision.addEventListener("change", function(e) {         
          subdivisions.visible = e.target.checked;
        });

        checkBoxTaxlots.addEventListener("change", function(e) {
          mtLayer.visible = e.target.checked;
        });

        checkBoxPendingLayer.addEventListener("change", function(e) {
          pendingLayer.visible = e.target.checked;
        });

    
        });

    districtsGroup.when(() => {

        console.log("districts should be loaded");
        
        var checkBoxDistrictsLayer = document.getElementById("districtsLayer");

        checkBoxDistrictsLayer.addEventListener("change", function(e) {
            console.log("clicking heard");
            districtsGroup.visible = e.target.checked;
            console.log(districtsGroup.visible);
          });
    });
      
        // view.popup.watch("visible", function (popUpStatusChange) {
        //     if (popUpStatusChange == true) {
        //       console.log("Pop-up watch has been fired")
        //       console.log("Pop-up title is:", view.popup.title); //returns the pop up title
        //       console.log("Pop-up content is:", view.popup.content); //returns the pop up content

        //             // Extract the value of {ACCOUNT} from the content string
        //     var regex = /Account:\s*(.*)/i; // Match the string "Account:" followed by any number of spaces and capture the rest of the string
        //     var match = regex.exec(view.popup.content);
        //     if (match) {
        //     var accountValue = match[1]; // The captured value is stored in the first capture group
        //     console.log("Account value is:", accountValue);
        //     }
        //     }
        //  });

        function queryPropTable(results) {
            for ([key, value] of Object.entries(results.features[0].attributes)) {
                //console.log(`${key}: ${value}`);
                if (`${key}` == 'ACCOUNT') {
                    tableWhere = "account_id = '" + `${value}` + "'"
                    //tableWhere = "account_id = '" + account_searched.value + "'"
                    //tableWhere="1=1"

                    //getData(`${value}`)

                    //console.log(tableWhere);

                    const tableQuery = new Query({
                        where: tableWhere,
                        returnGeometry: false,
                        outFields: ["*"]
                    });

                    prop.when(function() {
                        return prop.queryFeatures(tableQuery);
                    }).then(propResults)
                }
            }
        }

      
        view.on("click", function(evt){
            // console.log("latitude  = " + evt.mapPoint.latitude);
            // console.log("longitude = " + evt.mapPoint.longitude);
            // Create a graphic and add the geometry and symbol to it
            
                var query = new Query();
                query.geometry = evt.mapPoint;
                //console.log(query.geometry);
                query.outFields = ["*"];
                query.returnGeometry = true;
                query.spatialRelationship = "intersects";
                mtLayer.queryFeatures(query).then(function(results){
    
                    var features = results.features;

                    queryPropTable(results);

                    // for(var i = 0; i < features.length; i++){
                    //     console.log(features[i].attributes);
                    //     var queryReturn = features[i].attributes;
                    //     console.log(typeof(queryReturn));
                    //     //queryPropTable(queryReturn);
                            
                    // }
                    
                 });
        });
       
      

        const searchWidget = new Search({
            view: view,
            container: "searchWidget",
            allPlaceholder: "Maptaxlot, Account, Situs Address, or Owner Name",
            includeDefaultSources: false,
            sources: [{
                    layer: mtLayer,
                    searchFields: ["MAPTAXLOT"],
                    suggestionTemplate: "{MAPTAXLOT}",
                    //displayField: "MAPTAXLTOT",
                    exactMatch: false,
                    outFields: ["*"],
                    name: "Maptaxlot",
                    placeholder: "Search Map Taxlot...",
                },
                {
                    layer: mtLayer,
                    searchFields: ["ACCOUNT"],
                    suggestionTemplate: "{ACCOUNT}",
                    exactMatch: false,
                    outFields: ["*"],
                    //placeholder: "Account: Casey",
                    name: "Account ID",
                    placeholder: "Search by Account #...",
                    //zoomScale: 500000,
                },
                {
                    layer: mtLayer,
                    searchFields: ["SITUS_ADDRESS"],
                    suggestionTemplate: "{SITUS_ADDRESS}",
                    exactMatch: false,
                    outFields: ["*"],
                    //placeholder: "Account: Casey",
                    name: "Situs Address",
                    placeholder: "Search Situs Address...",
                    //zoomScale: 500000,
                },
                {
                    layer: mtLayer,
                    searchFields: ["OWNER_NAME"],
                    suggestionTemplate: "{OWNER_NAME}",
                    exactMatch: false,
                    outFields: ["*"],
                    //placeholder: "Account: Casey",
                    name: "Owner Name",
                    placeholder: "e.g., SMITH JOHN",
                    //zoomScale: 500000,
                },

            ]
        });
       


        searchWidget.on("select-result", function(event) {
            populateTables(event);
            console.log(event);
            console.log(typeof(event));
        });

            // view.goTo({
            //   scale: 10000
            // });
        function populateTables(event) {

            if (event) {
                for ([key, value] of Object.entries(event.result)) {
                    //console.log(`${key}: ${value}`);

                    if (`${key}` == 'name') {
                        const maptaxlot = `${value}`
                        //const strip_mt = maptaxlot.split("-").slice(0, 2).join("");
                        //const taxlotValue = [];
                        //taxlotValue.push(strip_mt);
                        //console.log(taxlotValue);

                        mt_whereClause = "MAPTAXLOT = '" + maptaxlot + "'";
                       // console.log(mt_whereClause);
                        //let mtLayer = landGroup.sublayers.getItemAt(1);

                        const mtQuery = new Query({
                            where: mt_whereClause,
                            returnGeometry: true,
                            outFields: ["*"]
                        });

                        //console.log(mtLayer); // check if mtLayer is defined and accessible
                        mtLayer.queryFeatures(mtQuery).then(function(mtResults) {

                            if (mtResults.features.length > 0) {
                                const mtFeature = mtResults.features[0];
                                const mtFeatureExtent = mtResults.features[0].geometry.extent;
                                //console.log(mtFeature+' : '+mtFeatureExtent)
                                //     view.goTo({ extent: mtFeatureExtent }).then(function() {
                                //     //   view.popup.open({
                                //     //     features: [mtFeature],
                                //     //     location: mtFeature.geometry.centroid
                                //     // });
                                //   });
                                console.log("mtResults: "+ mtResults);
                                queryPropTable(mtResults);
                                
                            }

                        });
                    }
                }
            }
        }

            

            function propResults(results) {
                //console.log("Query returned " + results.features.length + " features");
                //console.log(results.features[0].attributes)

                // account information
                document.getElementById("owner-name").innerText = results.features[0].attributes.owner_name;
                document.getElementById("map-tax-lot").innerText = results.features[0].attributes.map_taxlot;
                document.getElementById("situs-address").innerText = results.features[0].attributes.situs_address;
                document.getElementById("tax-status").innerText = results.features[0].attributes.tax_status;

                // real market values
                const land = parseInt(results.features[0].attributes.rmv_land);
                const land_num = land.toLocaleString('en-US');
                document.getElementById("land").innerText = '$' + land_num;
                const improv = parseInt(results.features[0].attributes.rmv_improvements);
                const improv_num = improv.toLocaleString('en-US');
                document.getElementById("structures").innerText = '$' + improv_num;
                const rmv_total = results.features[0].attributes.rmv_total;
                const rmv_total_num = rmv_total.toLocaleString('en-US');
                document.getElementById("total").innerText = '$' + rmv_total_num;

                // assessed values
                const spec = parseInt(results.features[0].attributes.maximum_av);
                const spec_num = spec.toLocaleString('en-US');
                document.getElementById("specially_assessed").innerText = '$' + spec_num;
                const tax_av = results.features[0].attributes.taxable_av;
                const tax_av_num = tax_av.toLocaleString('en-US');
                document.getElementById("assessed_value").innerText = '$' + tax_av_num;
                const vet = results.features[0].attributes.veterans_exemption;
                const vet_num = vet.toLocaleString('en-US');
                document.getElementById("vet_exception").innerText = '$' + vet_num;

            }

            
            let legend = new Legend({
                view: view,
                container: "legend"
              });
              


    });