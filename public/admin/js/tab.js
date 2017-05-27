function setTab(name, cursel, n)
{
    for (i = 1; i <= n + 1; i++)
    {
        var menu = document.getElementById(name + i);
        if (menu)
        {
            var con = document.getElementById("con_" + name + "_" + i);
            menu.className = i == cursel ? "caption-current" : "";
            con.style.display = i == cursel ? "block" : "none";
        }
    }
}

function clearMyDay(n, a)
{
    $("#myDay" + n).remove();
    $("#GD" + a).removeClass("selday").attr("on", 0);
    
}