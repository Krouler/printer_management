export const getCookie = (name: string) => {
    var cookieValue = '';
    if (document.cookie && document.cookie !== '') {
        let cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

export const CSRF_TOKENINPUT = () => {
    return(
        <input type='hidden' name='csrfmiddlewaretoken' value={getCookie('csrftoken')}></input>
    )
}
