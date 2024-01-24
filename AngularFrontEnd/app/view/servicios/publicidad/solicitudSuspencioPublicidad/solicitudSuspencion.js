function solicitudSuspencionController($scope,sessionService, CONFIG,ngTableParams, $filter) {
    $scope.tblSolicitudes       =   {};
    $scope.solicitudes          =   [];
    $scope.mostrarFormulario    = false;
    $scope.tblPublicidadCoorporativa =   {};
    $scope.publicidadCoorporativa    =   [];
    $scope.mesLi = "";
    $scope.mesSuspencion = "";
    var headerImage ="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBAQFBAYFBQYJBgUGCQsIBgYICwwKCgsKCgwQDAwMDAwMEAwODxAPDgwTExQUExMcGxsbHCAgICAgICAgICD/2wBDAQcHBw0MDRgQEBgaFREVGiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICD/wAARCACCAk8DAREAAhEBAxEB/8QAHAABAAIDAQEBAAAAAAAAAAAAAAUGAwQHAgEI/8QAUBAAAQMDAgMEBQcFDQQLAAAAAQACAwQFERIhBhMxByJBURQyYXGBCBUjQlKRoTNicpLBFhckNDZDc6KxsrPC0TeChNJTVFVjdIOTlNPh8f/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A/VKAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIMNRVRwGMO9aR2B7hu5x67AIMDZ7nJnVTinbzQ1uXCRzmB25Ib3W5b+cUG6gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICCi8T8fijuVVbqGlElQyIxekudyyJTvhpw7Ye363sQVvhfjKsqbvSW+8NNWHvaxnPDTKCXZ2ewNJ330uBBQdeQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBBy7tMhrWXbmSwB1FMxvJla0vdqaO80/Z6ZwOoQafZ9w++9Xll1mzT0tqka5kZBD5JerevRo6oOuoCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA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";
    var footerImage ="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBKwErAAD/2wBDAAcEBAQFBAcFBQcKBwUHCgwJBwcJDA0LCwwLCw0RDQ0NDQ0NEQ0PEBEQDw0UFBYWFBQeHR0dHiIiIiIiIiIiIiL/2wBDAQgHBw0MDRgQEBgaFREVGiAgICAgICAgICAgICAhICAgICAgISEhICAgISEhISEhISEiIiIiIiIiIiIiIiIiIiL/wAARCABqASwDAREAAhEBAxEB/8QAHAABAAIDAQEBAAAAAAAAAAAAAAUGBAcIAwIB/8QARBAAAQMCBQIEAwUFBQUJAAAAAgEDBAAFBgcREiETMRQiQVEIMmEVFiNCgTNScZGxFyQlYqE0Q3KC4ThThpKztMHC0v/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDpGgUCgUFczCzBw/gPDb18vTmgD5WI4/tH3V+VsE919V9E5Wg5gw78UGPY+PJOJJxeItktRF+0a6NAwOuxGV/KYpr5vVe9B1NgvGuHsY2Rq8WOR14x/OK8G2fqDg/lJKCcoNPZvfErbMG3xqxWZhu53Bo/8SVTVG2k/wC7Qh/3nv6J/HsGZhL4ocur1tZuZOWaWXGklNzOv0dH/wCyJQbHbvtldti3VuawdsEd6yxcFWkH3U0XbpQaXzL+JF4+vbcDrtRtC6l2MUXVUThGQNO3+Yk/T1oPHLX4sWJzQRcXxtj6cHNjJx/xE17fUf5UG7bJiCzX2Ek20y25cYvztEhfoqd0X6LQZ9AoFAoFAoFAoFAoFAoFAoFAoFAoFAoFAoFAoFAoFBD4xxfYsI4fkX29vIxBjpqv7xEvygCfmIl4RKDiXNnNO+5i4kO5z16UJrUbfBRdRZa/+SLuS+v8ESgqsL51T3SguWXGYGLMC30brZVVQLRJUQtek+H7pJ7+xd0oNy5nfFVHewgxFwg27Gvc8NJbzqaLDReFEV7E4voqdk579g5zMzcNTMlIyXUiXlVVe6qtBlx3N7f+ZOFoJS1SZQtPMA6Qxz272kJUAlReFIey6aUEwyzsjqP5lRdf1SgpTLzrDqONLoY9loLlhPGV3tr/AI+yy3IUwf2iNlp/5k7EP8UoNy4X+KoI0E0xfDVVaBSSbF0TeSJwJNr2VV41Ff0oL9lHnNhvMm09aFpFvDH+22wy1MP84LxvBffT6LpQXqgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUEff7/acP2eRebu+Ma3xQU3nS/onuq9kRKDi3OfOC9ZmYg6vmYsEVVG2wdeE9Oo56K4X+icJ9Qo4Q0/Ov8qDPtm1mWO1NEXyr+tBM0EZGloU09/Lby6c9vpQesi1gXLK7S9l7f8ASgxBF2O9o4ijrwvtQT9hj7hVxflQv6dqCX9aCiOpo6SexEn+tB9R5Dsd5HWl0NP5KnstBkX+dIlxGkaaIY/zuL6bvb+CUGHh7EN5w5eGLxZpJxLhHXVt4F/mip2VF7Ki8LQdh5HZ+WbMSCkCZth4rYHV+HroLyJ3dY17p+8Pcf4c0Gz6BQKBQKBQKBQKBQKBQKBQKBQKBQKBQKBQa7znzxw/lxbNnll4jfH+525F7ezjypyIIv6r6e6Byxj3O7HWO4caFiKQBxI5KaMsD0hM17EYpwSonCe1B0Dbcv8AArnw8jeVssNbl9gG/wCKVkOp1UjqqHu77tedaDlig9IjEl+QLcZsnX1VNoAKkSr9ETmgvLmVuZbsFX2MPXAkUdR0jnrz7JprQUidb59ulFEnMORpTa6E06CgYr9RLRaC+5IxoF4zEskW4MBIiuukL7LibhXRsu6L9eaDo7FllyKwuDH3jtltiBK3Izvjbt2zTd8gl21SgwrZg/InH1qeTDIRFRryk7A/BcaUuyqHHfTjcOi0GmsQZd4jteKpWH40Z2c+wqbCYbItwEm4D0HXTVF5+tBSL5lVmPb1fly7BPbiIRErqxz2oOvdVROKCNw5gvFOJCP7Ftsqc0yQo+cZonEDdym5RRdNdF0oLWOV2YooiDh64oicInhnf/zQQ+Isvb1bGRfvdpk28XSUW3nWiZ3EiaqibkRFWggY9vu1qnNXG0SFblRyRxl0F2OASdlFfeg6iyJ+ImNi1GsN4p0hYsFNGjJNrczT9z0Fz3H1/L7IG5KBQKBQKBQKBQKBQKBQKBQKBQKBQKBQamz0+IW14EiO2qy7ZuKj8u35mom7sT3pv05EO/qvHcOQrxebnerk9c7o+cqfJJTefcXcREtBh0HaNs/7LH/hpz/2pUHGIPOB2Xigu2S+MbzhvMCDdLXAeuUhN7RQowqpug4KoopohKnOi66elB0eOameAOMyX8v3Ps5eXmm3kKQI/RPUtPTbQR/xZYXtdyy9bxP0dlyt7rSA8qbXFZfXarZ+vBEi6L2/nQaU+Hl/Zm9YW/ym+X80aOg398RmWWLcdQrU1hwGjcik/wBbquI3ojiBppr3+VaDA+HTJDEuAZ8+7395pJMplI7URgt6IO9DUyLtr5URET60Em5mpfHcXXuLhG0nf4wK00DzRbWQdaFRe3HoqL5lRO/pQSmCcdZkzsSHacVYVO2w3N6xbkyfUa1FN21zldu5NdF178aUFKzAxeWT2O554ft8dyPiRpma+ye4BB5tXGyUUDT5/mX60F5ylxtjbGFvK83m3R7dZyT+5qCudR3nk/MuiB9fWg1F8RmaNqxPcGbDaNHoVtcInJiLqjjqpoqB7iPv6r247hqNx1pv51RPp60GOdx8yK2nmFUICXhRJOUUdOUVKDqH4cs1sRYwtRW2+RH3ZEFNBvKAvReT91w+3VT/AFTvz3DbdAoFAoFAoFAoFAoFAoFAoFAoFAoFBD4gwpa7xh+dZ9gR25rbgK622CqBOCqdQUVFTcmuqKtBzHnF8MluwTZ490td0fktuOI04DzKKg6oq7lNvRBTsmipzQa1bwfFT9q+S/8ACiJ/XWg7DwnYftPIuFYY6oiy7N4VtXNdv4jKgm7bzpzzpQapa+EXELX7OTbkX30cX+oLQbEyXys+4k+cFyfjP3aUAqx0d24GBVUP5kThSUe1BWMw4nxRSswVbws8saxk5tjuisfwwta8E5vQjVdO6aKvtQT3xQ9dnI6d1iR15HIaOGiaIq9YNS09NVoOdvh5k785cOCqaL4gv/SOg6G+IvNDFmBGrMWH3o7SzSkI/wCIDfr00b26e3zrQaTxJnbmriWEUSXeuhDcTRxqC2LO5F7opj59F9U3UHQWVsTweR9vDCItLcVgqTal8qzFReop/Xqapz/SggcqofxBnjt2Vi+SbeFgEt0d/oKrhkOg9NG03DtLzKvCelBO44ynYxpmPb7ldFRbHboiI4wnd51XTJAX2DTkvftQfebllzJu9lTD2C240a3uBslSDd6RbO3RbERXamndfbj3oOcMxsp8cYGgx5l9WMLEo1aaSO4pluFNefKPGlBSaC55J4ItONMesWS6i8cFWzdcWOYgooCa6kpIvlVdE8vPNB1zhHBOGsIwlgWCMsWIZbya6jrg7tOSTqESCq+ulBNUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgruY2C28Y4VkWMn1jmaibTqcohhyO5PVNe9ByjmFh9cDYmLD9ylMvyRAXVOOqkgoeuglqiKJ6JroqdlSg2Lg295kBAsMQ8Tx4USd4YINq3NJNOG64jIONibRjovOm5ddE10oMyRes8vGuMQr4Ln91Wcw0otq4TKy1iAC/hIPUUu/p9aBdbdj6R9m3M8VA/ihm4vW0Hoy6xmBRnqOg502t6nuDRU2qPag9boxnLeZLdgxFiZi1WpybHguPsEMd2YL6CpBFIWtymommm7bzxQUHFjGeOI7W9h+Xd/F2Rx5sWocgRBzwqSujHfcMWhHTcIkqIe7TlR0oIzL/K7Etqu33mt99tsVLa24+1dFcPw4EBpGcQlJpV1FXU/LoqLqirQWHH+Ac5cTlGj4kv1vubcCRIZkmLgiFvUWkecOSSNhtFWgQuNfbvQVZMi8YK6H2XKhzm3jhpGfiuEQOtTTJoJA+RF6bbgKJ6oiivpQX3B+HszMNR4/3TxGxDgky27PO5OIUM3npBxgVgekqohkHGqarxQSUn+2SRPeuk7EgSJMKLcFihajBW2p8NAA2XQNvYS6Ocpoq+ypQfkiP8S8aSKO4ligCi74mQaCLbBxm+sQOErH7iqu4dR4Xmg/ZEnPJiyyZH3xYeuySoke3xWRZJuUM0dzStmTQ+Y9fKi6cIWtBRs1/wC1K4W6Cl9vMfEVu8WcZorfoaNzhHzsEgttlv2rxoiovpQRLeTOOYdo+8V+tUmLh5gwWaSIKSRYUk3mDJru8o+pJpQdN5bZOYJwQ67cbIDrkqUAp15KoZiHfaK6Jt115oLxQKBQKBQKBQKBQKBQKBQKBQKBQKBQKBQKDlfPrKfMa95p3e7WmySZVuf6PRfaQVQtI7Yl668EKpQV+Xe85MG2S3/a9mSOxa3Wht9ynQRJ5vY51wYCQSbkDeGu3X6dqCNHPXMILQtsbfYEVEwSSLAJJESe8QgC78yCJrqKUGYPxFZhCeqjB6ZE4b7QxAAHifHY6rmzTcpp3WgzoWfGYDzxyUjx1PVtyOrkdsmmXWA2AbQmnkLamiqNBWrVmDiyabEmV0CKE+LzMo29XEUHFdFpFVdNgkvtrt8uunFBlffXEx2WTZbeTK2+WLgSiUR4R1xt0hFf+JoaCZj5m43CZImOymielzFnyhFgNhuEx4YgMS13Nm3wQ/rQfSZrYngXBy6sOswv7kttBploAZaiquqNtAPy6FynrrQV9/OHFxW9u2NK0lvYGKLQk2KlpDeWQ0pF7715oMu05vYyJifH6rSeMcmPuqLaIW+4qKvqK/l5BNunagkp2cGMprvXfJjrkw9HedFkRJwZIdMyPTuWxOFoPIM18YNxVjg40gqMMWy6QbmygJtYcbL8pinG6gkbbd8YZj4gt9obOHGJp9ZbbLQhCAnyVFcd8uik6SJ/H2oOrbpbotzt0i3SkUo0psmXhRVRVAx2kmqduFoPZpoGmhaDgQRBT+CJolB6UCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUGvM9sr4GOMKG684+M+0tvyIQsKOhns+QhLQV3bETXVNKDkdrDLwqniy2eu0U5/mtBnx7dCj/s203fvL5l/1oMjWgrNxE2pbjCqvTFV2p6Ii89v1oJuzs9K3N+5eZf+b/pQWDDuEMS4kJ8LFCOacdEJ4W9uqIXCfMo99KCAx3hLGmHpDA4mt525JCEsRo1BdyBohL5FLlNyUFcoLTgjLvHGIWjn2O1vzYKKrRvNom1DTQtvKp6LQet9w9erBcFt15jFEmoIkrJ6btpdl4170GE2CuOCCaIpKgopKiJz7qvCUHSHw+ZYOWJl253y0NBc/KUG5dcJKG2aLr00BVEONOe660G4KBQKBQKBQKBQKBQKBQKBQKBQKBQKBQKBQKBQKBQaX+I7L+3/AGQ5iyM265c+q026u/8ACbjiBIug8aeZE/VaDQdAoIW/x1Wa0o/75EH9UXT+i0Eq663GbEdFUl0BptOSMuyCKetBuL4R497DEF/duUV6MKx2EaRwCAeDPhNyJqtBm/FBgfEmM8V4etOHmEkThiy3iBTBvyCbSKu41RO60GJlr8J1uk2Azx21JiXrrltajyGyDo7R2L5UNNd271oLd8M9tjWuyYktkXd4aFfZkdncupbGtoJqvvolBqb4opitZsPgiar4WPz/AMlBTcA4TueN8QDY4ctmJLdAiZV4XNpqKblHVsD08qKupaJQdr2iAFvtUWA2IiEdoGkEE0FNgonCe1Bl0CgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgj77h2yX6AtvvEUJcRV3dNxONydlTTRUXn0oNY4x+G/BCW+RcLUUyI4yJOeHYTxW7RNdoAehqq+nnoNGN4Wv8AIt8u6RIMl20wiIX5XSJBHav5vZU083t60GPhW12u94ysdum7ljPzWmnEDyltNdq6KuulBuDMHI3BWEDsuIrUUtbgN7tzQ9Z1DBBOQmugoA+3vQb5oISXhdJGM4OJeuorDiPxPD7eC65tnu3a8adPtpQTdBWsB4FZwkF2FqUUn7VuL9xLcKDsJ9dVBNFXVE070EHcMo7fd81pOJ75CjXG0uQmgZCQhEbUlstvDeuwgUOV3J3oLDAwLY7ZidL7bGW4a+EWGcZhsG2yQnBc3rtROU26UFgoFAoFAoFAoFAoFAoFAoFAoFAoFAoFAoFAoFAoFAoFAoMORZrVJtxW5+M2cA/mjKKdNfNu+Xt83NBUMQ5M4bmXi0Xayxolrl26c3LfNphEV0AXVQTYooKqvrQSuYuFJ2JrZAiQ3AbOLcoc41c10UIzm8kTRF5VO1BZqBQKBQKBQKBQKBQKBQKBQKBQKBQKBQKBQKBQKBQKBQKDULmed2jxvvLMZYHDbzs6PEtrceQ5OV2ELm1t58SVll5wm1XpkHA+q0HliHOPHuHrUxJmBaZsi6wEuFt8Cjxix+MyBC8O/V0CF/QDFR3GmmlBiXLPvGcCPLYchxPtOGM3qAbMhk/wVieHI4xOK431BlEu3eqromipQemJ87ccYfGGkzwTByI0uVrJts9oiKOYA2z0UdNxvqKfDhrtoPf+37EUeY9CudnGK+t0YhQ0RDdQxTprOjKolp4lkXNR7Cadk4Wgl8LZoYqm3DDb9zC3HacW9VYMeETiyomxsnh6ykSi5oI7HFER2HxQYN5z88Ni/EFlhpGcat0OYlv13k6dxgMeIcFxBXTpEiqKac6gVB9YrzcxhEiHJso25Ui4bYxDK64uuISuESE0CtuhtRUTUVXWg8L1jfMOSs+P4i2xXcKxo13ui6yIyTeoJPgy1+IpNs9NEAiJS3HxpprQeDXxEXTql4q1dBiTco0e1EoGqvMl0ilMEiF5ZTQuoo66IXonC0H7Ozsxpb8MxMSyG7U9DvkKVKtUWOrpvRTZZV4PFLv0cBBTa6oIG0qD5fz+xg1LFiRYRtxHFbaFZ24A+0lksxnTU0JdITRPp59PN6LQTr2ZmKrVbsYRLoMCRe8NW8bgxKio4kVzqg4QNOtkZEBiTfKb+RVF4oICZn3jZqXGbesQW1nZHbllM3cylmR48pWVEkRWAGSm017r/Cgk79nZebPjmRaygNyrDBlOhNeY3E+3EZiMPOv/ADKJdE5Gpiia7U96CPsWeWL74/CtsePbmJ11SGkSU71UjNlIGS4amm/cakEZEaBFRSJe9BkYozexph+WFsklailboLb89lqVIYFZTkkCVGm3OoW1I4+VF1RVXvQfLvxAToMnDUa8xo8F+anVvjbvVbNuO9JKLFcYA9CHqadYhc5EPrQXvLzFUzEdrmSpgtA9HuU6EAt68hEkG0JLqq8qIprQWWgUCgUCgUCgUCgUCgUCgUCgUCgUCg1s3ZbN/bxIe8Ex1vs/r9TpBu6q6Crmumu7TjXvQQVqw3h0MN43ALdFEPGC1tRhtE6aOoqB2+VF50oPqNh6wfchj/D43nh3Lf8Agt8/isd+Oe1B9YAs1o+ypqeDY0K3XFsk6YcgvS1FeOy+1BO2O2W5cNMaxml/xeG/8g/ttrX4nb5/r3oP3L+yWWNmViZ+NCjsvoSaONtAJfiLqfKJr5l5X3oMqJa7Z91rEnhWdEuyOJ+GPBrId1Lt3XXvQQODrFY2cEYxZZgx22nH5LTgC0CCTYpwCoiaKKe1BIZl2OyS8SYQKVBjvl4gWtXGgNenwuzlF8uvOlBKnbbcov6xmuMRMvp5B/bbmvxO3z/5u9BVouHcPhesf7bfFTVlQXRlvkXUVXE7djXkveguF5tVrl3RElRWXkWySmlRxsT/AA97Xk5RfL9KCu4Cs9pDJee0ERgWpDUnxAI2CC5wqedNPNxxzQTmIbZbZRbJUZp4PsKW3tcASTZqx5eUXj6UEPlpZ7SzbsKKzEYbXw9wXUWwTlzp7+yfm9fegj5dgsP3FvgeAjbEgR9B6Len4Tkjp+n5Py+1BmWGx2VhMOqzCjtqLVtJNjQDoW6VzwnfzLQT8y2W148YdaM0512wR7cArvRIaaIWqc6fWgp+W9ptcfMpx9iKy0+vX/EBsRLkeeUTWg2/QKBQKBQKBQKBQKBQKBQKBQKBQKBQf//Z";


    $scope.inicio = function(){
        var fechaact = new Date();
        var mes = fechaact.getMonth();
        var anio = fechaact.getFullYear();
        switch (mes) {
            case 0:
                $scope.mesLi = "DICIEMBRE";
                anio = anio-1;
                break;
            case 1:
                $scope.mesLi = "ENERO";
                break;
            case 2:
                $scope.mesLi = "FEBRERO";
                break;
            case 3:
                $scope.mesLi = "MARZO";
                break;
            case 4:
                $scope.mesLi = "ABRIL";
                break;
            case 5:
                $scope.mesLi = "MAYO";
                break;
            case 6:
                $scope.mesLi = "JUNIO";
                break;
            case 7:
                $scope.mesLi = "JULIO";
                break;
            case 8:
                $scope.mesLi = "AGOSTO";
                break;
            case 9:
                $scope.mesLi = "SEPTIEMBRE";
                break;
            case 10:
                $scope.mesLi = "OCTUBRE";
                break;
            case 11:
                $scope.mesLi = "NOVIEMBRE";
                break;
            case 12:
                $scope.mesLi = "DICIEMBRE";
                break;
            default:
                $scope.mesLi = "";
                break;
        };
        $scope.mesSuspencion = $scope.mesLi + '/'+anio;
        $scope.listarSolicitudes();
    }

    $scope.listarSolicitudes = function(){
        $.blockUI(); 
        try {
            var lstSolicitud   =   new lstRegistroSolicitud();
            lstSolicitud.oid_ciudadano  =   sessionService.get('IDSOLICITANTE');
            lstSolicitud.tipo_servicio  =   'PUB-S';
            lstSolicitud.listaSolicitudServicio(function(resultado){
                var resultadoApi = JSON.parse(resultado);
                if (resultadoApi.success) {
                    console.log("resultadoApi.success.length ",resultadoApi.success.length );
                    if(resultadoApi.success.length > 0){
                        $scope.solicitudes = resultadoApi.success;
                        console.log("$scope.solicitudes",$scope.solicitudes);
                        $scope.tblSolicitudes.reload();
                    } 
                } else {
                    swal('', "Datos no Encontrados !!!", 'warning');
                }
            });
        } catch (error) {
            console.log(error);
            swal('', "Ocurrio un error reintente mas tarde por favor!!!", 'error');
        }
        $.unblockUI();
    }

    $scope.tblSolicitudes = new ngTableParams({
        page: 1,
        count: 5,
        filter: {},
        sorting: {
            IdActividad: 'desc'
        }
    }, {
        total: $scope.solicitudes.length,
        getData: function($defer, params) {
            var filteredData = params.filter() ?
            $filter('filter')($scope.solicitudes, params.filter()) :
            $scope.solicitudes;
            var orderedData = params.sorting() ?
            $filter('orderBy')(filteredData, params.orderBy()) :
            $scope.solicitudes;
            params.total($scope.solicitudes.length);
            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });


    $scope.registrarSolicitud =function(){
        $.blockUI(); 
        $scope.mostrarFormulario = false;
        $scope.getCaptchasXX();
        $scope.publicidadCoorporativa    =   [];
        $scope.pubCoorporativa = false;
        $scope.datos = {};
        var datosCiudadano = new rcNatural();
        datosCiudadano.oid = sessionService.get('IDSOLICITANTE');
        datosCiudadano.datosCiudadanoNatural(function(resultado){ 
            var response = JSON.parse(resultado)[0];
            $scope.mostrarFormulario = true;
            if(response.dtspsl_tipo_persona =="NATURAL"){
                $scope.datos.tipoPersona = response.dtspsl_tipo_persona;
                $scope.datos.oidCiudadano = response._id;
                $scope.datos.nombres = response.dtspsl_nombres;
                $scope.datos.primerApellido = response.dtspsl_paterno;
                $scope.datos.segundoApellido = response.dtspsl_materno;
                $scope.datos.tipoDocumento = "CI";
                $scope.datos.documento = response.dtspsl_ci;
                $scope.datos.expedido = response.dtspsl_expedido;
                $scope.datos.correo = response.dtspsl_correo;
                $scope.datos.celular = response.dtspsl_movil;
                $scope.buscarPublicidad();
            }else{
                $scope.datos.tipoPersona = response.dtspsl_tipo_persona;
                $scope.datos.oidCiudadano = response._id;
                $scope.datos.nit = response.dtspsl_nit;
                $scope.datos.razonSocial = response.dtspsl_razon_social;
                $scope.datos.documentoRepresentante = response.dtspsl_ci_representante;
                $scope.datos.tipoDocumento = "NIT";
                var buscarRepresentante = new rcNatural();
                buscarRepresentante.tipo_persona = "NATURAL";
                buscarRepresentante.ci = $scope.datos.documentoRepresentante;
                buscarRepresentante.buscarPersona(function(resultadoN){
                    var datosRep = JSON.parse(resultadoN)[0];
                    $scope.datos.nombreRepresentante = datosRep.dtspsl_nombres;
                    $scope.datos.primerApRepresentante = datosRep.dtspsl_paterno;
                    $scope.datos.secundoApRepresentante = datosRep.dtspsl_materno;
                    $scope.datos.expedidoRepresentante = datosRep.dtspsl_expedido;
                    $scope.datos.correo = datosRep.dtspsl_correo;
                    $scope.datos.celular = datosRep.dtspsl_movil;
                    $scope.buscarPublicidad();
                })
            }
        })  
    }

    $scope.buscarPublicidad = function(){
        $scope.publicidadCoorporativa    =   [];
        var clase = "";
        var doc = "";
        if($scope.datos.tipoPersona == "NATURAL"){
            clase = "N";
            doc = $scope.datos.documento;
        }else{
            clase = "J";
            doc = $scope.datos.nit;
        }
        var buscarPubli = new listarPublicidad();
        buscarPubli.identificacion = doc;
        buscarPubli.clase = clase;
        buscarPubli.tipoPublicidad = "Gigantografia";
        buscarPubli.buscarPublicidades(function(resultadoPub){
            var respuesta = JSON.parse(resultadoPub);
            if(respuesta.success){
                if(respuesta.success.dataSql.length > 0){
                    $scope.publicidadCoorporativa    =   respuesta.success.dataSql;
                    $scope.mostrarFormulario    = true;
                    $.unblockUI();     
                    $scope.tblPublicidadCoorporativa.reload();
                }else{
                    $.unblockUI();     
                    swal('', "Usted no cuenta con publicidades!!!", 'warning');
                }
            }else{
                $.unblockUI();     
                swal('', "Ocurrio un error al buscar sus publicidades, reintente mas tarde por favor!!!", 'error');
            }
        })
    }

    $scope.tblPublicidadCoorporativa = new ngTableParams({
        page: 1,
        count: 5,
        filter: {},
        sorting: {
            idPublicidad: 'desc'
        }
    }, {
        total: $scope.publicidadCoorporativa.length,
        getData: function($defer, params) {
            var filteredData = params.filter() ?
            $filter('filter')($scope.publicidadCoorporativa, params.filter()) :
            $scope.publicidadCoorporativa;
            var orderedData = params.sorting() ?
            $filter('orderBy')(filteredData, params.orderBy()) :
            $scope.publicidadCoorporativa;
            params.total($scope.publicidadCoorporativa.length);
            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });

    /*****************************CAPTCHA*********************************/
    $scope.getCaptchasXX = function () {
        $("#resultadoCC").val("");
        $scope.habGuardar1 = true;
        $scope.validarAdjuntos = true;
        $scope.ErrorCapchasXX = "";
        $scope.SuccesCapchasxx = "";
        $scope.valorrandomm = Math.floor(Math.random() * (224 - 1) + 1);
        $scope.resultadoCC = "";
        var objCaptcha = new captcha();
        objCaptcha.obtcaptcha(function (resultado) {
            console.log("resultado",resultado);
            json = JSON.parse(resultado);
            partes = json.success[0].sp_captcha_porx1.split(',');
            numero1 = partes[0].substring(1);
            i1 = (partes[2] + "," + partes[3]);
            i2 = (partes[4] + "," + partes[5]);
            $scope.imageLNGG = i1.substring(1, i1.length - 1);
            $scope.imageCSTT = i2.substring(1, i2.length - 2);
            var lengua = "";
            if (partes[1] == 'A') {
                lengua = 'AYMARA';
            } else if (partes[1] == 'Q') {
                lengua = 'QUECHUA';
            } else if (partes[1] == 'G') {
                lengua = 'GUARANI';
            } else if (partes[1] == 'C') {
                lengua = 'CASTELLANO';
            } else {
            }
            $scope.toltipTt = "Palabra en " + lengua;
            $scope.palabraT = "Ingrese texto: " + lengua + " CASTELLANO";
        });
    };

    $scope.VerificarCapchaa = function (datos) {
        var captch = $("#resultadoCC").val();
        if (captch.length == 0)
            $scope.ErrorCapchasXX = "";
        if (captch.length > 3) {
            clearTimeout(tiemporespuesta);
            tiemporespuesta = setTimeout(verificarKeyPress.bind(undefined, captch), 1500);
        }
    };

    var tiemporespuesta = null;
    function verificarKeyPress(captch) {
        var id = numero1;
        var verCaptcha = new captcha();
        verCaptcha.identificador = id;
        verCaptcha.respuesta = captch;
        verCaptcha.verificarCaptcha(function (resultado) {
            json = JSON.parse(resultado);
            var nroregsitros = json.success.length;
            if (nroregsitros == 0) {
                $scope.habGuardar1 = true;
                $scope.ErrorCapchasXX = "Verifique el Capcha";
                $scope.SuccesCapchasxx = "";
                $scope.$apply();
            } else {
                $scope.habGuardar1 = false;
                $scope.ErrorCapchasXX = "";
                $scope.SuccesCapchasxx = "Capcha correcto";
                $("#miFormGuardar").removeAttr("disabled");
                $scope.$apply();
            }
        });
    }
    /***********************************FIN CAPTCHA**********************/
    $scope.guardarSolicitud =  function(data){
        data.mesSuspencion = $scope.mesSuspencion;
        data.publicidadesSuspencion = [];
        for(var i = 0;i < $scope.publicidadCoorporativa.length; i++){
            if($scope.publicidadCoorporativa[i].solicitudSupencion){
                data.publicidadesSuspencion.push($scope.publicidadCoorporativa[i]);
            }
        }
        if (data.publicidadesSuspencion.length>0) {       
            data.origen_solicitud = "igob";   
            var creaSolicitud = new adicionaRegistroSolicitud();
            creaSolicitud.cod_servicio = 'PUB-S';
            creaSolicitud.id_usuario = 3;
            creaSolicitud.data_formulario = JSON.stringify(data);
            creaSolicitud.enviado = "SI";       
            try {
                creaSolicitud.adicionaRegistroSolicitudServicio(function(res){
                    var respuesta = (JSON.parse(res)).success;
                    if(respuesta.length  > 0){                  
                        sessionService.set('IDTRAMITE', respuesta[0].vfrm_ser_id);
                        sessionService.set('CODTRAMITE', respuesta[0].vfrm_ser_codigo_servicio);   
                        swal("Señor(a) Ciudadano(a) su solicitud fue registrado correctamente.", "Número de registro: " + respuesta[0].vfrm_ser_codigo_servicio + ". Imprima y firme el formulario para su presentación en Oficinas de Publicidad, adjuntando documentación requerida, en un folder amarillo con fastenes, foliadas de la última a la primera página.");                    
                        $scope.generarPdfSuspencion(data,respuesta[0].vfrm_ser_codigo_servicio);
                        $scope.mostrarPdf = true;
                        $scope.mostrarFormulario = false;
                        $scope.listarSolicitudes();
                    }
                    else{
                        $.unblockUI();         
                    }
                })
            } catch (error) {
                console.log("error",error);
                $.unblockUI();
            }  
        }else{
            swal('','No se selecciono ninguna publicidad para suspencion','error');
        }
    }
    /*******************************GUARDAR PDF**************************/
    $scope.generarPdfSuspencion = function(dataSuspencion,nroTramite) {
        var datosTabla = dataSuspencion.publicidadesSuspencion;
        var cel_contacto = "";
        var nombre = "";
        var numDocumento = "";
        var encabezado = [];
        var contenidoTabla = [];
        encabezado = [
            { text: 'Nro.', style: 'tablaEncabezado' ,alignment: 'center'},  
            { text: 'ID Publicidad', style: 'tablaEncabezado' ,alignment: 'center'},  
            { text: 'Tipo letrero', style: 'tablaEncabezado',alignment: 'center' },
            { text: 'Característica', style: 'tablaEncabezado',alignment: 'center' },    
            { text: 'Macrodistrito', style: 'tablaEncabezado',alignment: 'center' },
            { text: 'Dirección', style: 'tablaEncabezado' ,alignment: 'center'},
            { text: 'Caras', style: 'tablaEncabezado' ,alignment: 'center'},
            { text: 'Superficie m2', style: 'tablaEncabezado',alignment: 'center' }
        ];
        contenidoTabla.push(encabezado);
        datosTabla.forEach(function(dato, index) {
            var fila = [
                {text: (index + 1).toString(), alignment: 'center' },
                dato.idPublicidad,
                dato.tipoLetrero,  
                dato.caracteristica,  
                dato.Macrodistrito,
                ("Zona "+dato.zona+" "+dato.claseVia+" "+dato.via+" "+dato.numero),
                dato.caras.toString(),
                dato.superficie.toString()      
            ];
          contenidoTabla.push(fila);
        });
        var fechaact = new Date();
        var dia=fechaact.getDate();
        var mes=fechaact.getMonth()+1;
        var anio=fechaact.getFullYear();
        var fechaActual = dia.toString().padStart(2, '0') + '/' + mes.toString().padStart(2, '0') + '/' + anio;
        if(dataSuspencion.celular) cel_contacto = ' - '+ dataSuspencion.celular; else cel_contacto = "";
        if(dataSuspencion.tipoPersona == 'JURIDICO') {
            nombre = (dataSuspencion.nombreRepresentante).trim() +' '+  (dataSuspencion.primerApRepresentante).trim() +' '+  (dataSuspencion.secundoApRepresentante).trim();
            numDocumento = dataSuspencion.documentoRepresentante;  
            numExpedido = dataSuspencion.expedidoRepresentante;
        }
        else {
            nombre = (dataSuspencion.nombres).trim() + ' ' + (dataSuspencion.primerApellido).trim()+' '+ (dataSuspencion.segundoApellido).trim();
            numDocumento = dataSuspencion.documento;
            numExpedido = dataSuspencion.expedido;
        }
        console.log("contenidoTabla",contenidoTabla);
        var docDefinition = {
            pageSize: 'letter',
            pageMargins: [ 50, 90, 50, 100 ],
            header: [        
                {image: headerImage,width: 390},  	 
                {canvas: [{ type: 'line', x1: 50, y1: 1, x2: 595-2*30, y2: 1, lineWidth: 1 }]}
            ],
            footer: {
                columns: [
                    {text: 'Unidad de Publicidad – DCI - SMDE - GAMLP\nCalle Chichas – Edif. Espra, Piso 5, Miraflores.\n(Saliendo del puente de las Américas)\nTelf. 2650715', alignment: 'left',fontSize: 8 ,margin: [50, 10, 0, 0] },
                    {image: footerImage,width: 130},              
                ],          
            },
            content: [
                { text: 'FORMULARIO DE SOLICITUD DE SUSPENCIÓN TEMPORAL DE PATENTE DE PUBLICIDAD', fontSize: 11, alignment: 'center', bold: true },
                { text: 'Código: ' + nroTramite +  '      Fecha: ' + fechaActual, fontSize: 11, alignment: 'center', bold: true },
                dataSuspencion.tipoPersona === 'JURIDICO' ? [
                    { text: '\nDatos persona jurídica', fontSize: 11, bold: true },
                    {
                        columns: [
                            { width: 150, text: 'NIT:', fontSize: 9, bold: true },
                            { width: '*', text: dataSuspencion.nit, fontSize: 9 }
                        ]
                    },    
                    {
                        columns: [
                            { width: 150, text: 'Razón social:', fontSize: 9, bold: true },
                            { width: '*', text: dataSuspencion.razonSocial, fontSize: 9 }
                        ]
                    }
                ] : "",
                { text: '\nDatos del solicitante', fontSize: 11, bold: true },
                { 
                    columns: [
                        { width: 150, text: 'Nombre del solicitante:', fontSize: 9, bold: true },
                        { width: '*', text: nombre, fontSize: 9 }
                    ]
                },
                { 
                    columns: [
                        { width: 150, text: 'Cédula de identidad:', fontSize: 9, bold: true },
                        { width: '*', text: numDocumento, fontSize: 9 }
                    ]
                },
                { 
                    columns: [
                        { width: 150, text: 'Correo electrónico:', fontSize: 9, bold: true },
                        { width: '*', text: dataSuspencion.correo, fontSize: 9 }
                    ]
                },
                { 
                    columns: [
                        { width: 150, text: 'Teléfono o Celular:', fontSize: 9, bold: true },
                        { width: '*', text: dataSuspencion.celular, fontSize: 9 }
                    ]
                },
                { text: '\nSolicito la suspensión temporal de los siguientes elementos publicitarios por el mes de '+dataSuspencion.mesSuspencion, fontSize: 11, bold: true },
                {
                    style: 'tabla',
                    table: {
                        headerRows: 1,
                        widths: ['auto','auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
                        body: contenidoTabla
                    },fontSize: 9
                },
                { text: '\nDECLARACIÓN DE VERACIDAD DE LA INFORMACIÓN DEL PRESENTE FORMULARIO',fontSize: 11, bold: true },
                { text: '\nYo ' + nombre + ', con Carnet de Identidad N° ' + numDocumento + ' expedido en ' + numExpedido + ', declaro la veracidad de los datos expresados en el presente formulario, conforme a lo establecido en la Ley Municipal Autónoma N° 206/2016, los Decretos Municipales N° 007/2007-014/2018 y Reglamento de Publicidad Urbana (REPU), el presente formulario cuenta con calidad de Declaración Jurada conforme a parágrafo I, artículo 78 de la Ley 2492 del Código Tributario.' ,alignment: 'justify',fontSize: 9},      
                { 
                    columns: [
                        { width: 300,text: '\n\n\n\n\n\n_____________________________________\nFirma del solicitante',fontSize: 9 },
                        { width: '*', text: '\nSELLO DE REGISTRO EN EL SISTEMA\n\n\n\n\n_________________________________________\n\nFecha de registro: ______/______/________',fontSize: 9 },
                    ]
                },
            ]
        };
        console.log("docDefinition",docDefinition);
        var pdfDocGenerator = pdfMake.createPdf(docDefinition);
        pdfDocGenerator.getDataUrl(function(dataUrl) {
            $('#declaracion').modal('show');
            var iframe = document.getElementById('viewPdf');
            iframe.src = dataUrl;
        });
    };

    $scope.cancelar = function(){
        $scope.mostrarFormulario = false;
    }
      
};