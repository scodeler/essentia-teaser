class Validate{
  email(value:string){
    // eslint-disable-next-line
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
  }
}

export default Validate