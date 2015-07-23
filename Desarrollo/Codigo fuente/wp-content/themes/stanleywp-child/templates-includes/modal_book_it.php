<!-- Modal -->
<div class="modal fade" id="modalSenData" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog" id="modal-custom-position">
    <div class="modal-content">
      <div class="modal-header" id="header-custom">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">Solicitud de cotización</h4>
      </div>
      <div class="modal-body">
        <div id="info-promotion-modal">  
          <h5>Información de la promoción</h5>
          <h5 id="titlemodalpromo"><?php the_field('tituloPromocion'); ?></h5>
          <div id="content-info-modal">
            <div class="fields-promotions"><strong>Hotel: </strong><span id="hotel-name"></span></div>
            <div class="fields-promotions" id="type-room">
              <strong>Tipo de habitaciones seleccionadas: </strong>
              <div id="dinamyc-room"></div>
            </div>
            <div class="fields-promotions"><strong>Cantidad de personas: </strong><span id="total-person"></span></div>
            <div class="fields-promotions"><strong>Precio total: </strong><span id="total-price"></span></div>
          </div> 
        </div>

        <div class="separator-section"></div>

        <div id="info-titular-modal">
          <h5>Información del titular</h5>
        </div>
        <?php gravity_form(1, false, false, false, '', true, 12); ?>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" id="btn-close" data-dismiss="modal">Close</button>
        
      </div>
    </div>
  </div>
</div>