const createFooter = () => {
    let footer = document.querySelector('footer');

    footer.innerHTML = `
    <div class="footer-content">
            <img src="./static/img/light-logo.png" alt="" class="logo">
            <div class="footer-ul-container">
                <ul class="category">
                    <li class="category-title">Hommes</li>
                    <li><a href="#" class="footer-link">Tee shirts</a></li>
                    <li><a href="#" class="footer-link">Pulls</a></li>
                    <li><a href="#" class="footer-link">Chemises</a></li>
                    <li><a href="#" class="footer-link">Jeans</a></li>
                    <li><a href="#" class="footer-link">Pantalons</a></li>
                    <li><a href="#" class="footer-link">Chaussures</a></li>
                     <li><a href="#" class="footer-link">sports</a></li>
                    <li><a href="#" class="footer-link">Montres</a></li>
                </ul>
                <ul class="category">
                    <li class="category-title">Femmes</li>
                    <li><a href="#" class="footer-link">Tee shirts</a></li>
                    <li><a href="#" class="footer-link">Pulls</a></li>
                    <li><a href="#" class="footer-link">Chemises</a></li>
                    <li><a href="#" class="footer-link">Jeans</a></li>
                    <li><a href="#" class="footer-link">Pantalons</a></li>
                    <li><a href="#" class="footer-link">Chaussures</a></li>
                     <li><a href="#" class="footer-link">Sports</a></li>
                    <li><a href="#" class="footer-link">Montres</a></li>
                </ul>
            </div>
        </div>
        <p class="footer-title">© WilStore</p>
       <p class="info">supports</p>
        <p class="info"><i class="fa-solid fa-envelope"></i><a href="mailto:wilstore237@gmail.com" class="info">wilstore237@gmail.com</a></p>
       <p class="info"><i class="fa-brands fa-whatsapp"></i><a href="tel:+237657-007-435" class="info">657-007-435/677-364-422</a></p>
       <div class="footer-social-container">
        <div>
            <a href="#" class="social-link">terms & services</a>
            <a href="#" class="social-link">privacy page</a>
        </div>
        <div>
            <a href="#" class="social-link"><i class="fa-brands fa-instagram"></i>wilstore_237</a>
            <a href="#" class="social-link"><i class="fa-brands fa-facebook"></i>wilstore</a>
            <a href="#" class="social-link"><i class="fa-brands fa-twitter"></i>wilstore</a>
        </div>
       </div>
       <p class="footer-credit">copyright 2022 <a href="#"><span>WilStore</span></a>, tous  droits resersés</p>
    `;
}
createFooter();