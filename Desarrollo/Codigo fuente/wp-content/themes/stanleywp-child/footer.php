<?php
/**
 * Footer Template
 *
 *
 * @file           footer.php
 * @package        StanleyWP 
 * @author         Brad Williams & Carlos Alvarez 
 * @copyright      2011 - 2014 Gents Themes
 * @license        license.txt
 * @version        Release: 3.0.3
 * @link           http://codex.wordpress.org/Theme_Development#Footer_.28footer.php.29
 * @since          available since Release 1.0
 */
?>
</div><!-- end of wrapper-->
<?php gents_wrapper_end(); // after wrapper hook ?>


<?php gents_container_end(); // after container hook ?>

<div class="subscripcionContainer">
    <div class="container">
        <div class="row">
            <div class="titleSubscripcion col-md-5">
                <h4>¡Recibe inspiración para tus viajes, consejos y ofertas!</h4>
                <div class="descriptionSubscripcion">
                    Mándame las últimas novedades en inspiración para viajes, consejos de expertos, y ofertas de Vamosya!
                </div>
            </div>


            <script type="text/javascript">
            //<![CDATA[
            if (typeof newsletter_check !== "function") {
            window.newsletter_check = function (f) {
                var re = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-]{1,})+\.)+([a-zA-Z0-9]{2,})+$/;
                if (!re.test(f.elements["ne"].value)) {
                    alert("The email is not correct");
                    return false;
                }
                for (var i=1; i<20; i++) {
                if (f.elements["np" + i] && f.elements["np" + i].value == "") {
                    alert("");
                    return false;
                }
                }
                if (f.elements["ny"] && !f.elements["ny"].checked) {
                    alert("You must accept the privacy statement");
                    return false;
                }
                return true;
            }
            }
            //]]>
            </script>

            <div class="newsletter newsletter-subscription">
            <form method="post" action="<?=get_bloginfo('wpurl')?>/wp-content/plugins/newsletter/do/subscribe.php" onsubmit="return newsletter_check(this)">

            <div class="formSubscripcion col-md-4">
                <section class="content">
                    <span class="input input--hoshi">
                        <input class="newsletter-email input__field input__field--hoshi" type="email" name="ne" id="input-4" required />
                        <label class="input__label input__label--hoshi input__label--hoshi-color-1" for="input-4">
                            <span class="input__label-content input__label-content--hoshi">Email</span>
                        </label>
                    </span>
                </section>
            </div>
            <div class="col-md-3" id="button-newsletter-vamosya">
                <button class="newsletter-td-submit button button--moema button--inverted button--text-thick button--size-s" type="submit">Suscribete</button>
            </div>

            </form>
            </div>

        </div>
    </div>
</div>



  <!-- +++++ Footer Section +++++ --> 
<footer id="footer">
    <div class="container" id="container_footer">
        
        <div class="col-md-3 sectionfooter">
            <div class="titlelist">
                <div class="hi-icon-wrap hi-icon-effect-8">
                    <div class="hi-icon icon icon-conocenos circled "></div>
                    <div class="icon-title" >Conócenos</div>
                </div>
            </div>

            <ul>
                <li class="fotter-list-item"><a href="<?=get_permalink(26)?>"><?php $id="26"; $post = get_page($id); echo apply_filters('the_title', $post->post_title); ?> </a></li>
                <li class="fotter-list-item"><a href="<?=get_permalink(28)?>"><?php $id="28"; $post = get_page($id); echo apply_filters('the_title', $post->post_title); ?> </a></li>
                <li class="fotter-list-item"><a href="<?=get_permalink(30)?>"><?php $id="30"; $post = get_page($id); echo apply_filters('the_title', $post->post_title); ?> </a></li>
            </ul>
        </div>
        <div class="col-md-3 sectionfooter">
            <div class="titlelist">
                <div class="hi-icon-wrap hi-icon-effect-8">
                    <div class="hi-icon icon icon-has_dinero circled"> </div>
                    <div class="icon-title" >Trabaja con nosotros</div>
                </div>
            </div>

            <ul>
                <li class="fotter-list-item"><a href="<?=get_permalink(32)?>"><?php $id="32"; $post = get_page($id); echo apply_filters('the_title', $post->post_title); ?> </a></li>
                <li class="fotter-list-item"><a href="<?=get_permalink(34)?>"><?php $id="34"; $post = get_page($id); echo apply_filters('the_title', $post->post_title); ?> </a></li>
            </ul>
        </div>

        <div class="col-md-3 sectionfooter workcontain">
            <div class="titlelist">
                <div class="hi-icon-wrap hi-icon-effect-8">
                    <div class="hi-icon icon icon-contactenos circled"></div>
                    <div class="icon-title" >Contáctenos</div>
                </div>
            </div>

            <ul>
                <li class="fotter-list-item">
                    <div class="workinfo">
                        <i class="fa fa-phone"></i><span>5684758</span>
                    </div>
                </li>
                <li class="fotter-list-item">
                    <div class="workinfo">
                        <i class="fa fa-mobile"></i><span>944810867</span>
                    </div>
                </li>
                <li class="fotter-list-item">
                    <div class="workinfo">
                        <i class="fa fa-envelope-o"></i><span>gianfranco.vasquez1@gmail.com</span>
                    </div>
                </li>
                <li class="fotter-list-item">
                    <div class="workinfo">
                        <i class="fa fa-clock-o"></i><span>L-V 8:00-19:00, S 9:00-13:00</span>
                    </div>
                </li>
            </ul>
        </div>

        <div class="col-md-3 sectionfooter">
            <div class="titlelist">
                <div class="footer-logo-item-container hi-icon-wrap hi-icon-effect-8">
                    <div class="hi-icon icon icon-siguenos circled effect-1 hvr-pulse-shrink"></div>
                    <div class="icon-title">Síguenos</div>
                </div>
            </div>

            <ul>
                <li class="fotter-list-item">
                    <div class="socialinfo">
                        <i class="fa fa-facebook-square"></i><a href="https://www.facebook.com/vamosyaagency">Facebook</a>
                    </div>
                </li>
            </ul>
        </div>     

    </div> 
</footer>

<?php wp_footer(); ?>

</body> 
</html>

