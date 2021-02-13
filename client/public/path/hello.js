 function change(value)
{
  if(value == 'Canada')
  {
    document.getElementById('Province-div').style.display = 'block';
    document.getElementById('city-div').style.display = 'block';
  }else{
    document.getElementById('Province-div').style.display = 'none';
    document.getElementById('city-div').style.display = 'none';
  }
}