class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filters() {
    const queryObj = { ...this.queryString };
    const excludeData = ["page", "sort", "limit", "feilds"];
    excludeData.forEach((el) => delete queryObj[el]);
    // console.log('console.log: ', this.queryString);

    // filltering the api response

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

    //get the query
    return this.query.find(JSON.parse(queryStr));
  }
  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      console.log(sortBy);

      this.query = this.query.sort(sortBy).limit(5);
    }
  }
}

module.exports = ApiFeatures;
