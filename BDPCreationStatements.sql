CREATE TABLE "LocationDonuts" (
	"LocationID"	INTEGER,
	"DonutID"	INTEGER,
	PRIMARY KEY("LocationID","DonutID")
);

CREATE TABLE "Locations" (
	"LocationID"	INTEGER,
	"Address"	VARCHAR(50),
	"City"	VARCHAR(50),
	"State"	VARCHAR(50),
	"PostalCode"	INTEGER,
	"Country"	VARCHAR(50),
	"PhoneNumber"	VARCHAR(50),
	PRIMARY KEY("LocationID" AUTOINCREMENT)
);

CREATE TABLE "delivery_service" (
	"DeliveryID"	INTEGER,
	"CompanyName"	VARCHAR(9),
	PRIMARY KEY("DeliveryID" AUTOINCREMENT)
);

CREATE TABLE "donuts" (
	"DonutID"	INTEGER,
	"Name"	VARCHAR(13),
	"Price"	DECIMAL(3, 2),
	PRIMARY KEY("DonutID" AUTOINCREMENT)
);

CREATE TABLE "employees" (
	"EmployeeID"	INTEGER,
	"FirstName"	VARCHAR(50),
	"LastName"	VARCHAR(50),
	"Address"	VARCHAR(50),
	"City"	VARCHAR(50),
	"State"	VARCHAR(50),
	"Country"	VARCHAR(50),
	"PostalCode"	INTEGER,
	"PhoneNumber"	VARCHAR(50),
	"Email"	VARCHAR(50),
	"LocationID"	INTEGER,
	PRIMARY KEY("EmployeeID" AUTOINCREMENT)
);

CREATE TABLE "sales" (
	"SaleID"	INTEGER,
	"SaleDate"	DATE,
	"Quantity"	INTEGER,
	"EmployeeID"	INTEGER,
	"DeliveryID"	INTEGER,
	"DonutID"	INTEGER,
	PRIMARY KEY("SaleID" AUTOINCREMENT)
);