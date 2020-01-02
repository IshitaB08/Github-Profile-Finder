$(document).ready(function () {
    $('#searchUser').on('keyup', function (e) {
        let username = e.target.value;

        $.ajax({
            url: 'https:/api.github.com/users/' + username,
            data: {
                client_id: '4249bafcf4da3861e580',
                client_secret: 'c5bf778516a1dfd708d27bd43430185b313db9bd'
            }
        }).done(function (user) {
            $.ajax({
                url: 'https:/api.github.com/users/' + username + '/repos',
                data: {
                    client_id: '4249bafcf4da3861e580',
                    client_secret: 'c5bf778516a1dfd708d27bd43430185b313db9bd',
                    sort: 'created : asc',
                    per_page: 5
                }
            }).done(function (repos) {
                $.each(repos, function (index, repo) {
                    $('#repos').append(`
            <div id="repo" class="card">
              <div class="row">
                <div class="col-md-7">
                  <strong>${repo.name}</strong> : ${repo.description}
                </div>
                <div class="col-md-3">
                  <span class="badge badge-dark">Forks : ${repo.forks_count}</span>
                  <span class="badge badge-info">Watchers : ${repo.watchers_count}</span>
                  <span class="badge badge-success">Stars : ${repo.stargazers_count}</span>
                </div>
                <div class="col-md-2">
                  <a href="${repo.html_url}" target="_blank" class="btn btn-dark">Repo Page</a>
                </div>
              </div>
            </div>
            `);
                })
            });
            $("#profile").html(`
        <div id="#user" class="card mb-3" style="width: 100%;">
          <div class="row no-gutters">
            <div class="col-md-4">
              <img src="${user.avatar_url}" class="card-img" alt="...">
              <a target="_blank" class="btn btn-dark btn-block" href="${user.html_url}">View Profile </a>
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">${user.name}</h5>
                <span class="badge badge-dark">Public Repos : ${user.public_repos}</span>
                <span class="badge badge-primary">Public Gists : ${user.public_gists}</span>
                <span class="badge badge-success">Followers : ${user.followers}</span>
                <span class="badge badge-info">Following : ${user.following}</span>
                <ul class="list-group">
                  <li class="list-group-item">Company : ${user.company} </li>
                  <li class="list-group-item">Website/Blog : ${user.blog} </li>
                  <li class="list-group-item">Location : ${user.location} </li>
                  <li class="list-group-item">Member Since : ${user.created_at} </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <h3 class="page-header">Latest Repos : </h3>
        <div id="repos"></div>
        `);
        });
    })
});