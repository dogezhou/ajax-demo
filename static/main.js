$(function (){

    var $orders = $('#orders');
    var $name = $('#name');
    var $drink = $('#drink');

    var orderTemplate = $('#order-template').html();
    console.log(orderTemplate)
    function addOrder(order) {
        console.log(order)
        $orders.append(Mustache.render(orderTemplate, order));
    }

    $.ajax({
        type: 'GET',
        url: '/api/orders',
        success: function(orders) {
            $.each(orders, function(i, order) {
                addOrder(order)
            });
        },
        error: function() {
            alert('载入 orders 错误！');
        }
    });

    $('#add-order').on('click', function() {

        var order = {
            name: $name.val(),
            drink: $drink.val()
        }

        $.ajax({
            type: 'POST',
            url: '/api/orders',
            data: JSON.stringify(order),
            success: function(newOrder) {
                addOrder(newOrder)
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            error: function() {
                alert('保存 order 错误！')
            }
        })
    })

    $orders.delegate('.remove', 'click', function() {

        var $li = $(this).closest('li');

        $.ajax({
            type: 'DELETE',
            url: 'api/orders/' + $(this).attr('data-id'),
            success: function() {
                $li.fadeOut(300, function() {
                    $(this).remove()
                });
            },
            error: function() {
                alert('删除 order 错误！')
            }
        })
    })

    $orders.delegate('.editOrder', 'click', function() {
        var $li = $(this).closest('li');
        $li.find('input.name').val( $li.find('span.name').html() );
        $li.find('input.drink').val( $li.find('span.drink').html() );
        $li.addClass('edit');
    });

    $orders.delegate('.cancelEdit', 'click', function() {
        $(this).closest('li').removeClass('edit');
    });

    $orders.delegate('.saveEdit', 'click', function() {
        var $li = $(this).closest('li');
        var order = {
            name: $li.find('input.name').val(),
            drink: $li.find('input.drink').val(),
        }

        $.ajax({
            type: 'PUT',
            url: 'api/orders/' + $li.attr('data-id'),
            data: JSON.stringify(order),
            success: function(newOrder) {
                $li.find('span.name').html(newOrder.name)
                $li.find('span.drink').html(newOrder.drink)
                $li.removeClass('edit')
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            error: function() {
                alert('更新 order 错误！')
            }
        })
    });
})