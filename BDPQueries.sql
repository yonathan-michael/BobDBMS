-- What percentage of our sales are delivered to our customers?

SELECT (DeliveryCount/1000.00) * 100.00 AS PercentDelivered
FROM (SELECT COUNT(sales.saleID) AS DeliveryCount 
FROM sales
where sales.DeliveryID IS NOT NULL);

-- Which location does each employee work at?

SELECT employees.LastName, employees.FirstName, Locations.Address
FROM employees
LEFT JOIN Locations
ON employees.LocationID = Locations.LocationID
ORDER BY employees.LastName;

-- Which locations sold between 400 and 1000 donuts?

Select Locations.Address, SUM(SalesByLocation.Quantity) AS DonutsSold
FROM (SELECT employees.LocationID, sales.Quantity
FROM sales
LEFT JOIN employees
ON sales.EmployeeID = employees.EmployeeID) as SalesByLocation
LEFT JOIN Locations
ON SalesByLocation.LocationID = Locations.LocationID
GROUP BY Locations.Address
HAVING DonutsSold > 400 AND DonutsSold < 1000
ORDER BY DonutsSold;

-- How many donuts did each flavor sell?

SELECT donuts.Name, DonutSales.TotalSold
FROM (SELECT sales.DonutID, SUM(sales.Quantity) as TotalSold
FROM sales
GROUP BY sales.DonutID) as DonutSales
LEFT JOIN donuts
ON donuts.DonutID = DonutSales.DonutID
ORDER BY DonutSales.TotalSold;

-- Which employees have sold over $1000 worth of donuts?

SELECT employees.FirstName, employees.LastName, EmployeeSales.EmployeeRevenue
FROM (SELECT sales.EmployeeID, SUM(sales.Quantity * donuts.Price) as EmployeeRevenue
FROM sales
LEFT JOIN donuts
ON donuts.DonutID = sales.DonutID
GROUP BY sales.EmployeeID
HAVING EmployeeRevenue > 1000
ORDER BY EmployeeRevenue) AS EmployeeSales
LEFT JOIN employees
ON employees.EmployeeID = EmployeeSales.EmployeeID;


-- Which donuts are in each location?

SELECT AddressDonut.Address, donuts.Name
FROM (SELECT Locations.Address, LocationDonuts.DonutID
FROM Locations
INNER JOIN LocationDonuts
ON LocationDonuts.LocationID = Locations.LocationID
ORDER BY Locations.Address) as AddressDonut
LEFT JOIN donuts
ON donuts.DonutID = AddressDonut.DonutID;