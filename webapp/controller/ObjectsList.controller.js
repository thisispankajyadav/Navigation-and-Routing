sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller,JSONModel, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("demoapp.controller.ObjectsList", {

		onInit : function () {
			var oViewModel1 = new JSONModel({
				currency: "UoM"
			});
			this.getView().setModel(oViewModel1, "view");
		
			
		},
		// onUpdateFinished : function (oEvent) {
		// 	// update the worklist's object counter after the table update
		// 	var sTitle,
		// 		oTable = oEvent.getSource(),
		// 		iTotalItems = oEvent.getParameter("total");
		// 	// only update the counter if the length is final and
		// 	// the table is not empty
		// 	if (iTotalItems && oTable.getBinding("items").isLengthFinal()) {
		// 		sTitle = this.getResourceBundle().getText("objectlistTableTitleCount", [iTotalItems]);
		// 	} else {
		// 		sTitle = this.getResourceBundle().getText("objectlistTableTitle");
		// 	}
		// 	this.getModel("objectlistView").setProperty("/objectlistTableTitle", sTitle);
		
		onFilterInvoices : function (oEvent) {

			// build filter array
			var aFilter = [];
			var sQuery = oEvent.getParameter("query");
			if (sQuery) {
				aFilter.push(new Filter("Name", FilterOperator.Contains, sQuery));
			}

			// filter binding
			var oList = this.byId("objectList");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		},
		
		onPress: function (oEvent) {
			var oItem = oEvent.getSource();
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("detail", {
				objectPath: window.encodeURIComponent(oItem.getBindingContext("object").getPath().substr(1))
			});
		}

	});
});